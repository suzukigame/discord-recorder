import { Client, GatewayIntentBits, VoiceChannel } from 'discord.js';
import { joinVoiceChannel, VoiceConnectionStatus, entersState } from '@discordjs/voice';
import { RecordingSession } from './recorder.js';
import * as dotenv from 'dotenv';

dotenv.config();

export class BotManager {
    private clients: Client[] = [];
    private sessions: Map<string, RecordingSession> = new Map(); // channelId -> session
    private botStatus: Map<number, boolean> = new Map(); // index -> isBusy

    constructor(tokens: string[]) {
        tokens.forEach((token, index) => {
            const client = new Client({
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildVoiceStates,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.MessageContent,
                ],
            });

            client.on('clientReady', () => {
                console.log(`Bot ${index + 1} logged in as ${client.user?.tag}`);
                this.botStatus.set(index, false);
            });

            process.on('unhandledRejection', (error) => {
                console.error('Unhandled promise rejection:', error);
            });

            client.login(token);
            this.clients.push(client);
        });
    }

    public async startRecording(channel: VoiceChannel): Promise<string> {
        // すでに録音中の場合はエラー
        if (this.sessions.has(channel.id)) {
            throw new Error('This channel is already being recorded.');
        }

        // 空いているBotを探す
        const freeBotIndex = this.clients.findIndex((_, i) => !this.botStatus.get(i));
        if (freeBotIndex === -1) {
            throw new Error('No available bots for recording. (Maximum 3 simultaneous recordings)');
        }

        const client = this.clients[freeBotIndex];
        const sessionId = `${Date.now()}_${channel.id}`;

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator as any,
            selfDeaf: false,
            selfMute: true,
        });

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 20e3);

            const session = new RecordingSession(
                channel.id,
                channel.guild.id,
                sessionId,
                connection,
                freeBotIndex
            );
            session.start();

            this.sessions.set(channel.id, session);
            this.botStatus.set(freeBotIndex, true);

            return sessionId;
        } catch (error) {
            connection.destroy();
            throw error;
        }
    }

    public stopRecording(channelId: string) {
        const session = this.sessions.get(channelId);
        if (!session) return;

        session.stop();
        this.sessions.delete(channelId);

        // Bot のステータスを解放（空きにする）
        this.botStatus.set(session.botIndex, false);
        console.log(`[BotManager] Bot ${session.botIndex + 1} released from channel ${channelId}`);
    }

    public getMainClient() {
        return this.clients[0];
    }
}
