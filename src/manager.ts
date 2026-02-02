import { Client, GatewayIntentBits, VoiceChannel } from 'discord.js';
import { joinVoiceChannel, VoiceConnectionStatus, entersState } from '@discordjs/voice';
import { RecordingSession } from './recorder.js';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

export class BotManager {
    private clients: Client[] = [];
    private sessions: Map<string, RecordingSession> = new Map(); // channelId -> session
    private botStatus: Map<number, boolean> = new Map(); // index -> isBusy
    private pendingStops: Map<string, NodeJS.Timeout> = new Map(); // channelId -> timeout

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

            client.on('voiceStateUpdate', async (oldState, newState) => {
                // ボット自身の移動検知
                if (oldState.member?.user.id === client.user?.id) {
                    // 切断された場合（新しいチャンネルがない）
                    if (!newState.channelId && oldState.channelId) {
                        console.log(`[AutoStop] Bot ${index + 1} disconnected from ${oldState.channelId}. Stopping session.`);
                        this.stopRecording(oldState.channelId);
                    }
                    return;
                }

                // 他のボットの移動は無視
                if (oldState.member?.user.bot) return;

                // 録音中のチャンネルから誰かが退出した場合
                const channelId = oldState.channelId;
                if (!channelId) return;

                // デバッグログ: 退出イベント検知
                if (this.sessions.has(channelId)) {
                    // console.log(`[AutoStop Debug] User left ${oldState.channel?.name} (${channelId}). Bot index: ${index}`);
                } else {
                    return;
                }

                // セッションに関連付けられたチャンネルを取得
                // 重要: このBotが担当しているセッションなので、このBotのclientを使う
                try {
                    const channel = await client.channels.fetch(channelId);
                    if (!channel || channel.type !== 2) return; // 2 = GuildVoice

                    // 残っている「人間」を数える
                    const humanMembers = (channel as VoiceChannel).members.filter(m => !m.user.bot);
                    console.log(`[AutoStop Debug] Channel: ${channel.name}, Human count: ${humanMembers.size}`);

                    if (humanMembers.size === 0) {
                        console.log(`[AutoStop] All humans left channel ${channel.name}. Stopping...`);

                        // 既に停止予約されている場合はスキップ
                        if (this.pendingStops.has(channelId)) {
                            console.log(`[AutoStop] Stop already scheduled for ${channel.name}, skipping duplicate`);
                            return;
                        }

                        // 停止をスケジュール
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

        // 定期的にセッション中のチャンネルをチェック（イベントが来ない場合のフォールバック）
        setInterval(() => this.checkEmptyChannels(), 10000); // 10秒ごと
    }

    private async checkEmptyChannels() {
        // sessionsのエントリをコピーして反復処理し、Map変更時の影響を避ける
        const activeSessions = Array.from(this.sessions.entries());

        for (const [channelId, session] of activeSessions) {
            try {
                // セッションに割り当てられたBotのclientを使用
                const channel = await session.botClient.channels.fetch(channelId).catch(() => null);

                // チャンネルが取得できない（削除された等）場合も停止
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
        // すでに録音中の場合はエラー
        if (this.sessions.has(channel.id)) {
            throw new Error('This channel is already being recorded.');
        }

        // チャンネル名に基づいた特定のBotの割り当て試行
        let freeBotIndex = -1;
        const channelName = channel.name.toLowerCase();

        if (channelName.includes('room a')) {
            freeBotIndex = 0;
        } else if (channelName.includes('room b')) {
            freeBotIndex = 1;
        } else if (channelName.includes('room c')) {
            freeBotIndex = 2;
        }

        // 指定のBotがビジー、または対象外のチャンネル名の場合は空いているものを探す
        if (freeBotIndex === -1 || freeBotIndex >= this.clients.length || this.botStatus.get(freeBotIndex)) {
            // 元々の「空いているものを探す」ロジック（特定の割り当てがビジーな場合や名前が一致しない場合）
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
                client // MainClient (通知用) も担当Botにする
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
        // マップから先に削除（アトミック性確保、二重実行防止）
        const session = this.sessions.get(channelId);
        this.sessions.delete(channelId);

        if (!session) {
            console.log(`[BotManager] No session found for channel ${channelId}, already stopped or stopping.`);
            return;
        }

        // 保留中の自動停止タイマーをクリア
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

        // Bot のステータスを解放（空きにする）
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
