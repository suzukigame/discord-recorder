import { AudioReceiveStream, VoiceConnection } from '@discordjs/voice';
import { Client, VoiceChannel, ChannelType } from 'discord.js';
import { createWriteStream, mkdirSync, existsSync, statSync, unlinkSync, readdirSync } from 'fs';
import { pipeline, PassThrough } from 'stream';
import * as prism from 'prism-media';
import path from 'path';
import { exec } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class RecordingSession {
    private userStreams: Map<string, { opusStream: any, writeStream?: any, filePath?: string }> = new Map();
    private userOffsets: Map<string, number> = new Map();
    private directory: string;
    private sessionStartTime: number;

    constructor(
        public channelId: string,
        public channelName: string,
        public guildId: string,
        public sessionId: string,
        private connection: VoiceConnection,
        public botIndex: number,
        public textChannelId?: string,
        private mainClient?: Client
    ) {
        this.sessionStartTime = Date.now();
        // チャンネル名からファイルシステムで使えない文字を除去
        const safeChannelName = channelName.replace(/[\\/:*?"<>|]/g, '_');
        this.directory = path.join('data', 'recordings', `${safeChannelName}_${sessionId}`);
        mkdirSync(this.directory, { recursive: true });
    }

    private async getUsername(userId: string): Promise<string> {
        if (!this.mainClient) return userId;
        try {
            const guild = await this.mainClient.guilds.fetch(this.guildId);
            const member = await guild.members.fetch(userId);
            // ファイル名として安全な形式にする
            return (member.displayName || member.user.username).replace(/[\\/:*?"<>|]/g, '_');
        } catch (error) {
            console.warn(`[RecordingSession] Could not fetch username for ${userId}:`, error);
            return userId;
        }
    }

    public async start() {
        console.log(`[RecordingSession] Starting recording in channel ${this.channelId} (${this.channelName})`);

        // 既存のメンバーをスキャンして登録
        try {
            const channel = await this.mainClient?.channels.fetch(this.channelId);
            if (channel && channel.type === ChannelType.GuildVoice) {
                const voiceChannel = channel as VoiceChannel;
                voiceChannel.members.forEach(member => {
                    if (!member.user.bot) {
                        console.log(`[RecordingSession] Pre-subscribing to member: ${member.user.tag}`);
                        this.recordUser(member.id);
                    }
                });
            }
        } catch (e) {
            console.error('[RecordingSession] Error fetching channel members:', e);
        }

        this.connection.receiver.speaking.on('start', (userId) => {
            console.log(`[RecordingSession] User ${userId} speaking event triggered`);
            this.recordUser(userId);
        });
    }

    private async recordUser(userId: string) {
        if (this.userStreams.has(userId)) return;

        // プレースホルダーを置いて二重登録を防ぐ
        this.userStreams.set(userId, { opusStream: null });

        console.log(`[RecordingSession] Setting up listener for user ${userId}`);

        const opusStream = this.connection.receiver.subscribe(userId, {
            mode: 'opus',
        } as any);

        const username = await this.getUsername(userId);
        const fileName = `${username}_${userId}.mp3`;
        const outPath = path.join(this.directory, fileName);

        // データが来るまでファイル作成を待機する
        let isFileCreated = false;
        const pcmStream = new prism.opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 });
        const mp3Stream = new (prism as any).default.FFmpeg({
            args: [
                '-f', 's16le',
                '-ar', '48000',
                '-ac', '2',
                '-i', '-',
                '-codec:a', 'libmp3lame',
                '-b:a', '128k',
                '-f', 'mp3',
            ],
        });

        const buffer = new PassThrough();

        opusStream.on('data', (chunk) => {
            if (!isFileCreated && chunk.length > 0) {
                isFileCreated = true;
                // セッション開始からのオフセットを記録（ミリ秒）
                const offset = Date.now() - this.sessionStartTime;
                this.userOffsets.set(userId, offset);

                console.log(`[RecordingSession] Audio received for ${username} at offset ${offset}ms. Creating file: ${fileName}`);
                const writeStream = createWriteStream(outPath);

                this.userStreams.set(userId, { opusStream, writeStream, filePath: outPath });

                pipeline(buffer, pcmStream, mp3Stream, writeStream, (err) => {
                    if (err) {
                        console.error(`[RecordingSession] Error in pipeline for ${username}:`, err);
                    } else {
                        console.log(`[RecordingSession] Pipeline ended for ${username}`);
                    }
                    this.userStreams.delete(userId);
                });
            }
        });

        opusStream.pipe(buffer);
        this.userStreams.set(userId, { opusStream });
    }

    public async stop() {
        console.log(`[RecordingSession] Stopping recording and mixing files...`);

        const filesToMix: { path: string, offset: number, user: string }[] = [];

        try {
            // 全てのストリームを閉じる
            for (const [userId, stream] of this.userStreams.entries()) {
                // opusStreamの明示的なdestroyは行わず、connection.destroy()に任せる（DAVEネイティブクラッシュ回避のため）
                /*
                try {
                    if (stream.opusStream) stream.opusStream.destroy();
                } catch (e) {
                    console.warn(`[RecordingSession] Error destroying opusStream for ${userId}:`, e);
                }
                */

                try {
                    if (stream.writeStream) stream.writeStream.end();
                } catch (e) {
                    console.warn(`[RecordingSession] Error ending writeStream for ${userId}:`, e);
                }

                if (stream.filePath && existsSync(stream.filePath)) {
                    if (statSync(stream.filePath).size > 100) { // 閾値を100バイトに戻す
                        filesToMix.push({
                            path: stream.filePath,
                            offset: this.userOffsets.get(userId) || 0,
                            user: userId
                        });
                    } else {
                        try { unlinkSync(stream.filePath); } catch (e) { }
                    }
                }
            }
        } catch (err) {
            console.error('[RecordingSession] Critical error during stream cleanup:', err);
        } finally {
            this.userStreams.clear();
            try {
                this.connection.destroy();
            } catch (e) {
                console.error('[RecordingSession] Error destroying connection:', e);
            }
        }

        // ファイルの書き込み完了を待機
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (filesToMix.length > 0) {
            const success = await this.mixAudioFiles(filesToMix);

            // 合成に成功したら一時ファイルを削除
            if (success) {
                console.log(`[RecordingSession] Cleaning up temporary directory: ${this.directory}`);
                try {
                    for (const f of filesToMix) {
                        if (existsSync(f.path)) unlinkSync(f.path);
                    }
                    // ディレクトリが空なら削除（readdirSyncで確認）
                    if (readdirSync(this.directory).length === 0) {
                        const { rmdirSync } = await import('fs');
                        rmdirSync(this.directory);
                    }
                } catch (e) {
                    console.warn('[RecordingSession] Cleanup warning:', e);
                }
            }
        } else {
            console.log('[RecordingSession] No valid audio files to mix.');
            // 一時ディレクトリが空なら削除
            try {
                if (existsSync(this.directory) && readdirSync(this.directory).length === 0) {
                    const { rmdirSync } = await import('fs');
                    rmdirSync(this.directory);
                }
            } catch (e) { }
        }

        if (this.textChannelId && this.mainClient) {
            const channel = this.mainClient.channels.cache.get(this.textChannelId);
            if (channel?.isTextBased()) {
                if (filesToMix.length > 0) {
                    (channel as any).send(`✅ **Recording Finished**: Combined all voices in "${this.channelName}" into a single file.`);
                } else {
                    (channel as any).send(`ℹ️ **Recording Finished**: No conversation detected.`);
                }
            }
        }
    }

    private async mixAudioFiles(files: { path: string, offset: number, user: string }[]): Promise<boolean> {
        const safeChannelName = this.channelName.replace(/[\\/:*?"<>|]/g, '_');
        const outputFileName = `${safeChannelName}_${this.sessionId}_full.mp3`;
        // data/recordings の直下に保存
        const outputPath = path.resolve('data', 'recordings', outputFileName);

        if (!ffmpegPath) {
            console.error('[RecordingSession] FFmpeg path is not defined. Mixing skipped.');
            return false;
        }

        console.log(`[RecordingSession] Mixing ${files.length} files into ${outputPath}`);

        if (files.length === 1 && files[0]) {
            const firstFile = files[0];
            try {
                // cross-platform copy
                const { copyFileSync } = await import('fs');
                copyFileSync(firstFile.path, outputPath);
                console.log(`[RecordingSession] Single file moved to ${outputPath}`);
                return true;
            } catch (e) {
                console.error('Failed to copy single file:', e);
                return false;
            }
        }

        const inputArgs = files.map(f => `-i "${path.resolve(f.path)}"`).join(' ');
        const filterComplex = files.map((f, i) => `[${i}:a]adelay=${f.offset}|${f.offset}[a${i}]`).join('; ') +
            `; ` + files.map((_, i) => `[a${i}]`).join('') +
            `amix=inputs=${files.length}:duration=longest:dropout_transition=0,volume=${files.length}[out]`;

        const command = `"${ffmpegPath}" ${inputArgs} -filter_complex "${filterComplex}" -map "[out]" -acodec libmp3lame -b:a 128k -y "${outputPath}"`;

        try {
            await execAsync(command);
            console.log(`[RecordingSession] Mixing complete: ${outputPath}`);
            return true;
        } catch (error) {
            console.error(`[RecordingSession] Mixing failed:`, error);
            return false;
        }
    }
}
