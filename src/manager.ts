import { Client, GatewayIntentBits, VoiceChannel } from 'discord.js';
import { joinVoiceChannel, VoiceConnectionStatus, entersState } from '@discordjs/voice';
import { RecordingSession } from './recorder.js';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import path from 'path';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export class BotManager {
    private clients: Client[] = [];
    private sessions: Map<string, RecordingSession> = new Map(); // channelId -> session
    private botStatus: Map<number, boolean> = new Map(); // index -> isBusy
    private pendingStops: Map<string, NodeJS.Timeout> = new Map(); // channelId -> timeout
    private recordingsDir: string;

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

            client.on('ready', () => {
                console.log(`Bot ${index + 1} logged in as ${client.user?.tag}`);
                this.botStatus.set(index, false);
            });

            client.on('voiceStateUpdate', async (oldState, newState) => {
                // ボット自身の移動検知
                if (oldState.member?.user.id === client.user?.id) {
                    if (!newState.channelId && oldState.channelId) {
                        console.log(`[AutoStop] Bot ${index + 1} disconnected from ${oldState.channelId}. Stopping session.`);
                        this.stopRecording(oldState.channelId);
                    }
                    return;
                }

                if (oldState.member?.user.bot) return;

                const channelId = oldState.channelId;
                if (!channelId) return;

                if (!this.sessions.has(channelId)) return;

                try {
                    const channel = await client.channels.fetch(channelId);
                    if (!channel || channel.type !== 2) return;

                    const humanMembers = (channel as VoiceChannel).members.filter(m => !m.user.bot);
                    console.log(`[AutoStop Debug] Channel: ${channel.name}, Human count: ${humanMembers.size}`);

                    if (humanMembers.size === 0) {
                        console.log(`[AutoStop] All humans left channel ${channel.name}. Stopping...`);
                        if (this.pendingStops.has(channelId)) return;

                        const timeout = setTimeout(() => {
                            this.pendingStops.delete(channelId);
                            this.stopRecording(channelId);
                        }, 1000);

                        this.pendingStops.set(channelId, timeout);
                    }
                } catch (e) {
                    console.error('[AutoStop] Error fetching channel:', e);
                }
            });

            client.login(token);
            this.clients.push(client);
        });

        this.recordingsDir = path.resolve('data', 'recordings');

        // 定期的にセッション中のチャンネルをチェック（イベントが来ない場合のフォールバック）
        setInterval(() => this.checkEmptyChannels(), 10000); // 10秒ごと

        // 古い録音データの自動クリーンアップ（起動時と24時間ごと）
        this.cleanupOldRecordings();
        setInterval(() => this.cleanupOldRecordings(), 24 * 60 * 60 * 1000);
    }

    private async cleanupOldRecordings() {
        try {
            const retentionDays = parseInt(process.env.RETENTION_DAYS || '7', 10);
            if (isNaN(retentionDays) || retentionDays < 0) return;

            console.log(`[Cleanup] Checking for recordings older than ${retentionDays} days in ${this.recordingsDir}...`);

            if (!fs.existsSync(this.recordingsDir)) {
                return;
            }

            const items = fs.readdirSync(this.recordingsDir);
            const now = Date.now();
            const msPerDay = 24 * 60 * 60 * 1000;
            let deletedCount = 0;

            for (const item of items) {
                const fullPath = path.join(this.recordingsDir, item);
                const stats = fs.statSync(fullPath);
                const ageMs = now - stats.mtimeMs;
                const ageDays = ageMs / msPerDay;

                if (ageDays > retentionDays) {
                    console.log(`[Cleanup] Deleting old recording: ${item} (Age: ${ageDays.toFixed(1)} days)`);
                    if (stats.isDirectory()) {
                        fs.rmSync(fullPath, { recursive: true, force: true });
                    } else {
                        fs.unlinkSync(fullPath);
                    }
                    deletedCount++;
                }
            }

            if (deletedCount > 0) {
                console.log(`[Cleanup] Successfully deleted ${deletedCount} old recordings.`);
            }
        } catch (error) {
            console.error('[Cleanup] Error during automatic cleanup:', error);
        }
    }

    private async checkEmptyChannels() {
        const activeSessions = Array.from(this.sessions.entries());

        for (const [channelId, session] of activeSessions) {
            try {
                const channel = await session.botClient.channels.fetch(channelId).catch(() => null);

                if (!channel || channel.type !== 2) {
                    console.log(`[AutoStop Polling] Channel ${channelId} accessible check failed. Stopping...`);
                    this.stopRecording(channelId);
                    continue;
                }

                const humanMembers = (channel as VoiceChannel).members.filter(m => !m.user.bot);

                if (humanMembers.size === 0) {
                    console.log(`[AutoStop Polling] Detected empty channel ${(channel as VoiceChannel).name}, stopping...`);

                    if (!this.pendingStops.has(channelId)) {
                        const timeout = setTimeout(() => {
                            this.pendingStops.delete(channelId);
                            this.stopRecording(channelId);
                        }, 1000);

                        this.pendingStops.set(channelId, timeout);
                    }
                }
            } catch (e) {
                console.error('[AutoStop Polling] Error checking channel:', e);
            }
        }
    }

    public async startRecording(channel: VoiceChannel, textChannelId?: string): Promise<string> {
        if (this.sessions.has(channel.id)) {
            throw new Error('This channel is already being recorded.');
        }

        let freeBotIndex = -1;
        const channelName = channel.name.toLowerCase();

        if (channelName.includes('room a')) {
            freeBotIndex = 0;
        } else if (channelName.includes('room b')) {
            freeBotIndex = 1;
        } else if (channelName.includes('room c')) {
            freeBotIndex = 2;
        }

        if (freeBotIndex === -1 || freeBotIndex >= this.clients.length || this.botStatus.get(freeBotIndex)) {
            freeBotIndex = this.clients.findIndex((_, i) => !this.botStatus.get(i));
        }

        if (freeBotIndex === -1) {
            throw new Error('No available bots for recording. (Maximum 3 simultaneous recordings)');
        }

        const client = this.clients[freeBotIndex];
        if (!client) {
            throw new Error('Selected bot client is not initialized.');
        }

        const now = new Date();
        const timestamp = now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            now.getDate().toString().padStart(2, '0') +
            now.getHours().toString().padStart(2, '0') +
            now.getMinutes().toString().padStart(2, '0');

        const sessionId = `${timestamp}`;

        const targetGuild = await client.guilds.fetch(channel.guild.id);
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: targetGuild.voiceAdapterCreator as any,
            selfDeaf: false,
            selfMute: true,
            group: client.user?.id || 'default',
        });

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 20e3);

            const session = new RecordingSession(
                channel.id,
                channel.name,
                channel.guild.id,
                sessionId,
                connection,
                freeBotIndex,
                client,
                textChannelId,
                client
            );
            await session.start();

            this.sessions.set(channel.id, session);
            this.botStatus.set(freeBotIndex, true);

            return sessionId;
        } catch (error) {
            connection.destroy();
            throw error;
        }
    }

    public async stopRecording(channelId: string) {
        const session = this.sessions.get(channelId);
        this.sessions.delete(channelId);

        if (!session) {
            return;
        }

        const pendingTimeout = this.pendingStops.get(channelId);
        if (pendingTimeout) {
            clearTimeout(pendingTimeout);
            this.pendingStops.delete(channelId);
        }

        console.log(`[BotManager] Stopping session for ${channelId} (Bot ${session.botIndex + 1})`);

        try {
            await session.stop();
        } catch (error) {
            console.error(`[BotManager] Error during session stop:`, error);
        }

        this.botStatus.set(session.botIndex, false);
        console.log(`[BotManager] Bot ${session.botIndex + 1} released from channel ${channelId}`);
    }

    public async registerCommands(guildId?: string) {
        const token = process.env.DISCORD_TOKEN_1;
        if (!token) return;

        const commands = [
            new SlashCommandBuilder()
                .setName('record')
                .setDescription('Recording control')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('start')
                        .setDescription('Start recording the voice channel you are in')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('stop')
                        .setDescription('Stop recording and save the files')
                ),
        ].map(command => command.toJSON());

        const rest = new REST({ version: '10' }).setToken(token);
        const clientId = this.clients[0]?.user?.id;

        if (!clientId) {
            console.error('Could not get Client ID for command registration');
            return;
        }

        try {
            console.log('Started refreshing application (/) commands.');
            if (guildId) {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );
                console.log(`Successfully reloaded application (/) commands for guild ${guildId}.`);
            } else {
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
                console.log('Successfully reloaded application (/) commands globally.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    public getMainClient() {
        return this.clients[0];
    }
}
