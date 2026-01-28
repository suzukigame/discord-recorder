import { AudioReceiveStream, VoiceConnection } from '@discordjs/voice';
import { Client } from 'discord.js';
import { createWriteStream, mkdirSync } from 'fs';
import { pipeline } from 'stream';
import * as prism from 'prism-media';
import path from 'path';

export class RecordingSession {
    private userStreams: Map<string, any> = new Map();

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
        // チャンネル名からファイルシステムで使えない文字を除去
        const safeChannelName = channelName.replace(/[\\/:*?"<>|]/g, '_');
        const dir = path.join('data', 'recordings', `${safeChannelName}_${sessionId}`);
        mkdirSync(dir, { recursive: true });
    }

    public start() {
        console.log(`[RecordingSession] Starting recording in channel ${this.channelId}`);
        this.connection.receiver.speaking.on('start', (userId) => {
            console.log(`[RecordingSession] User ${userId} started speaking`);
            this.recordUser(userId);
        });
    }

    private recordUser(userId: string) {
        if (this.userStreams.has(userId)) return;

        const opusStream = this.connection.receiver.subscribe(userId, {
            mode: 'opus',
        } as any);

        const safeChannelName = this.channelName.replace(/[\\/:*?"<>|]/g, '_');
        const outPath = path.join('data', 'recordings', `${safeChannelName}_${this.sessionId}`, `${userId}.mp3`);
        const writeStream = createWriteStream(outPath);

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

        console.log(`[RecordingSession] Initialized streams for user ${userId}. Saving to: ${outPath}`);

        try {
            pipeline(opusStream as any, pcmStream, mp3Stream, writeStream, (err) => {
                if (err) {
                    console.error(`[RecordingSession] Error in pipeline for user ${userId}:`, err);
                } else {
                    console.log(`[RecordingSession] Pipeline ended for user ${userId}`);
                }
                this.userStreams.delete(userId);
            });
        } catch (err) {
            console.error(`[RecordingSession] Critical error starting pipeline for user ${userId}:`, err);
        }

        this.userStreams.set(userId, { opusStream, writeStream });
    }

    public stop() {
        this.userStreams.forEach((stream) => {
            stream.opusStream.destroy();
            stream.writeStream.end();
        });
        this.userStreams.clear();
        this.connection.destroy();

        // チャンネルに通知（オートストップ用）
        if (this.textChannelId && this.mainClient) {
            const channel = this.mainClient.channels.cache.get(this.textChannelId);
            if (channel?.isTextBased()) {
                (channel as any).send(`⏹️ **Auto-Stopped**: Recording in "${this.channelName}" has ended because all members left.`);
            }
        }
    }
}
