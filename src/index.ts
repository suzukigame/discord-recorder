import { BotManager } from './manager.js';
import { WebServer } from './server.js';
import { ChannelType, Message } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

// グローバルエラーハンドラ
process.on('uncaughtException', (error) => {
    console.error('[CRITICAL] Uncaught Exception:', error);
});

const tokens = [
    process.env.DISCORD_TOKEN_1,
    process.env.DISCORD_TOKEN_2,
    process.env.DISCORD_TOKEN_3,
].filter((t): t is string => !!t);

if (tokens.length === 0) {
    console.error('No Discord tokens found in .env');
    process.exit(1);
}

const manager = new BotManager(tokens);
const mainBot = manager.getMainClient();

if (!mainBot) {
    console.error('Main Bot client is not initialized.');
    process.exit(1);
}

// Webサーバーの起動
const webServer = new WebServer();
webServer.start();

mainBot.once('ready', async () => {
    console.log(`Main Bot logged in as ${mainBot.user?.tag}`);
    const guildId = process.env.GUILD_ID;
    await manager.registerCommands(guildId);
});

mainBot.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'record') {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'start') {
            const member = interaction.member as any;
            const channel = member?.voice.channel;
            if (!channel || channel.type !== ChannelType.GuildVoice) {
                return interaction.reply({ content: 'Please join a voice channel first!', ephemeral: true });
            }
            try {
                await interaction.deferReply();
                const sessionId = await manager.startRecording(channel as any, interaction.channelId || undefined);
                await interaction.editReply(`Recording started! Session ID: ${sessionId}`);
            } catch (error: any) {
                await interaction.editReply(`Failed to start recording: ${error.message}`);
            }
        }
        if (subcommand === 'stop') {
            const member = interaction.member as any;
            const channel = member?.voice.channel;
            if (!channel) return interaction.reply({ content: 'Join the channel first.', ephemeral: true });
            try {
                await interaction.reply('Recording stop requested...');
                await manager.stopRecording(channel.id);
            } catch (error: any) {
                if (interaction.channel?.isTextBased()) {
                    await (interaction.channel as any).send(`Error saving recording: ${error.message}`);
                }
            }
        }
    }
});

console.log('Voice Recorder Manager is starting...');
