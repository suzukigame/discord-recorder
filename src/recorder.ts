import { AudioReceiveStream, VoiceConnection } from '@discordjs/voice';
import { Client, VoiceChannel, ChannelType } from 'discord.js';
import { createWriteStream, mkdirSync, existsSync, statSync, unlinkSync, readdirSync, renameSync } from 'fs';
import { pipeline, PassThrough } from 'stream';
import * as prism from 'prism-media';
import path from 'path';
import { exec } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { promisify } from 'util';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { OpusEncoder } = require('@discordjs/opus');

const execAsync = promisify(exec);

export class RecordingSession {
    private userStreams: Map<string, {
        opusStream: any,
        writeStream?: any,
        filePath?: string,
        totalWrittenBytes: number
    }> = new Map();
    // 生成された全ての録音ファイルを追跡するリスト (path -> userId)
    private savedFiles: { path: string, user: string }[] = [];

    private directory: string;
    private sessionStartTime: number;

    constructor(
        public channelId: string,
        public channelName: string,
        public guildId: string,
        public sessionId: string,
        private connection: VoiceConnection,
        public botIndex: number,
        public botClient: Client,
        public textChannelId?: string,
        private mainClient?: Client
    ) {
        this.sessionStartTime = Date.now();
        const safeChannelName = channelName.replace(/[\\/:*?"<>|]/g, '_');
        this.directory = path.join('data', 'recordings', `${safeChannelName}_${sessionId}`);
        mkdirSync(this.directory, { recursive: true });
    }

    private async getUsername(userId: string): Promise<string> {
        if (!this.mainClient) return userId;
        try {
            const guild = await this.mainClient.guilds.fetch(this.guildId);
            const member = await guild.members.fetch(userId);
            return (member.displayName || member.user.username).replace(/[\\/:*?"<>|]/g, '_');
        } catch (error) {
            console.warn(`[RecordingSession] Could not fetch username for ${userId}:`, error);
            return userId;
        }
    }

    public async start() {
        console.log(`[RecordingSession] Starting recording in channel ${this.channelId} (${this.channelName})`);

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
        if (this.userStreams.has(userId) && this.userStreams.get(userId)?.writeStream) return;

        console.log(`[RecordingSession] Setting up PCM listener for user ${userId}`);

        const opusStream = this.connection.receiver.subscribe(userId, {
            mode: 'opus',
        } as any);

        const username = await this.getUsername(userId);
        // RAW PCMファイルとして保存 (s16le, 48000Hz, 2ch)
        const fileName = `${username}_${userId}_${Date.now()}.pcm`;
        const outPath = path.join(this.directory, fileName);

        console.log(`[RecordingSession] Starting PCM recording for ${username}.`);

        // ファイルリストへの登録は実際にファイルが作成されたときに行う（下記参照）

        const encoder = new OpusEncoder(48000, 2);
        const BYTES_PER_MS = 192; // 48000 * 2ch * 2bytes / 1000ms

        let isFileCreated = false;
        let totalWrittenBytes = 0;
        let writeStream: any = null;

        opusStream.on('data', (chunk: Buffer) => {
            if (!isFileCreated) {
                if (chunk.length > 0) {
                    isFileCreated = true;
                    const elapsedMs = Date.now() - this.sessionStartTime;
                    console.log(`[RecordingSession] First packet for ${username} at ${elapsedMs}ms`);

                    writeStream = createWriteStream(outPath);
                    // 実際にファイルが作成されたタイミングでsavedFilesに登録
                    this.savedFiles.push({ path: outPath, user: userId });
                    this.userStreams.set(userId, {
                        opusStream,
                        writeStream,
                        filePath: outPath,
                        totalWrittenBytes: 0
                    });
                }
            }

            if (isFileCreated && chunk.length > 0 && writeStream) {
                // Gap Filling Logic
                const elapsedMs = Date.now() - this.sessionStartTime;
                const streamMs = totalWrittenBytes / BYTES_PER_MS;
                const diffMs = elapsedMs - streamMs;

                if (diffMs > 20) { // 20ms以上のズレで補完
                    let missingBytes = Math.floor(diffMs * BYTES_PER_MS);
                    // 4バイト(stereo s16)の倍数に丸める
                    missingBytes = missingBytes - (missingBytes % 4);

                    if (missingBytes > 0) {
                        const silence = Buffer.alloc(missingBytes, 0);
                        writeStream.write(silence);
                        totalWrittenBytes += missingBytes;
                        const streamData = this.userStreams.get(userId);
                        if (streamData) streamData.totalWrittenBytes = totalWrittenBytes;
                    }
                }

                try {
                    const pcm = encoder.decode(chunk);
                    writeStream.write(pcm);
                    totalWrittenBytes += pcm.length;

                    const streamData = this.userStreams.get(userId);
                    if (streamData) streamData.totalWrittenBytes = totalWrittenBytes;
                } catch (e) {
                    console.error(`[RecordingSession] Opus decode error for ${username}:`, e);
                }
            }
        });

        opusStream.on('end', () => {
            console.log(`[RecordingSession] Opus stream ended for ${username}`);
            if (writeStream) writeStream.end();
            this.userStreams.delete(userId);
        });

        opusStream.on('error', (err: any) => {
            console.error(`[RecordingSession] Opus stream error for ${username}:`, err);
        });

        this.userStreams.set(userId, {
            opusStream,
            totalWrittenBytes: 0
        });
    }

    public async stop() {
        console.log(`[RecordingSession] Stopping session and finalizing PCM files...`);
        const sessionEndTime = Date.now();
        const durationMs = sessionEndTime - this.sessionStartTime;
        const BYTES_PER_MS = 192;
        const targetTotalBytes = Math.floor(durationMs * BYTES_PER_MS);

        const finishPromises: Promise<void>[] = [];

        // 全てのストリームに対して終了処理
        for (const [userId, stream] of this.userStreams.entries()) {
            if (stream.writeStream) {
                // Tail Padding (尻切れ防止)
                const currentBytes = stream.totalWrittenBytes;
                const missingBytes = targetTotalBytes - currentBytes;

                if (missingBytes > 4) { // 少なくとも1フレーム分以上の無音が必要
                    console.log(`[RecordingSession] Padding last ${Math.floor(missingBytes / BYTES_PER_MS)}ms for user ${userId}`);
                    const padding = Buffer.alloc(missingBytes - (missingBytes % 4), 0); // 4バイトの倍数に丸める
                    stream.writeStream.write(padding);
                }

                const p = new Promise<void>(resolve => {
                    stream.writeStream.on('finish', resolve);
                    stream.writeStream.end();
                });
                finishPromises.push(p);
            }
        }

        // 全ての書き込み完了を待機 (最大10秒)
        console.log(`[RecordingSession] Waiting for ${finishPromises.length} files to finish writing...`);
        await Promise.race([
            Promise.all(finishPromises),
            new Promise(resolve => setTimeout(resolve, 10000))
        ]);

        this.userStreams.clear();
        try {
            this.connection.destroy();
        } catch (e) {
            console.error('[RecordingSession] Error destroying connection:', e);
        }

        console.log(`[RecordingSession] All PCM files saved. Starting mixing...`);

        // savedFilesの中から、実在する有効なファイルを抽出してミックス
        const filesToMix: { path: string, user: string }[] = [];
        for (const fileRec of this.savedFiles) {
            if (existsSync(fileRec.path)) {
                if (statSync(fileRec.path).size > 1000) { // 程度あるもの
                    filesToMix.push(fileRec);
                } else {
                    try { unlinkSync(fileRec.path); } catch (e) { }
                }
            }
        }

        if (filesToMix.length > 0) {
            const success = await this.mixAudioFiles(filesToMix);

            if (success) {
                console.log(`[RecordingSession] Cleaning up temporary directory: ${this.directory}`);
                try {
                    for (const f of filesToMix) {
                        if (existsSync(f.path)) unlinkSync(f.path);
                    }
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
                    (channel as any).send(`✅ **Recording Finished**: Combined ${filesToMix.length} audio tracks in "${this.channelName}".`);
                } else {
                    (channel as any).send(`ℹ️ **Recording Finished**: No conversation detected.`);
                }
            }
        }
    }

    private async mixAudioFiles(files: { path: string, user: string }[]): Promise<boolean> {
        const safeChannelName = this.channelName.replace(/[\\/:*?"<>|]/g, '_');
        const outputFileName = `${safeChannelName}_${this.sessionId}_full.mp3`;
        const outputPath = path.resolve('data', 'recordings', outputFileName);

        if (!ffmpegPath) {
            console.error('[RecordingSession] FFmpeg path is not defined. Mixing skipped.');
            return false;
        }

        console.log(`[RecordingSession] Mixing ${files.length} PCM files into ${outputPath}`);

        // 単一ファイルの場合
        if (files.length === 1 && files[0]) {
            const firstFile = files[0];
            const command = `"${ffmpegPath}" -f s16le -ar 48000 -ac 2 -i "${path.resolve(firstFile.path)}" -acodec libmp3lame -b:a 256k -y "${outputPath}"`;
            try {
                await execAsync(command);
                console.log(`[RecordingSession] Single file converted to ${outputPath}`);
                return true;
            } catch (e) {
                console.error('Failed to convert single PCM file:', e);
                return false;
            }
        }

        // ファイルはリネームせずそのまま使用
        // (スペース入りパスでも path.resolve + クォートで対応)
        const inputArgs = files.map(f => `-f s16le -ar 48000 -ac 2 -i "${path.resolve(f.path)}"`).join(' ');

        // amix + volume調整 + limiter（ピーク抑制）
        // limiter: 0dBを超えるピークをソフトに抑制
        const filterComplex = files.map((_: any, i: number) => `[${i}:a]`).join('') +
            `amix=inputs=${files.length}:duration=longest:dropout_transition=0,volume=${files.length * 0.8},alimiter=limit=1:attack=5:release=50[out]`;

        const command = `"${ffmpegPath}" ${inputArgs} -filter_complex "${filterComplex}" -map "[out]" -acodec libmp3lame -b:a 256k -y "${outputPath}"`;

        try {
            const { stdout, stderr } = await execAsync(command);
            console.log(`[RecordingSession] Mixing complete: ${outputPath}`);
            return true;
        } catch (error: any) {
            console.error(`[RecordingSession] Mixing failed:`, error);
            if (error.stdout) console.log(`[RecordingSession] FFmpeg stdout: ${error.stdout}`);
            if (error.stderr) console.error(`[RecordingSession] FFmpeg stderr: ${error.stderr}`);
            return false;
        }
    }
}
