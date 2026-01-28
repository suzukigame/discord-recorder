import { BotManager } from './manager.js';
import { ChannelType, Message, TextChannel } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

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

mainBot.once('ready', async () => {
    console.log(`Main Bot logged in as ${mainBot.user?.tag}`);

    // スラッシュコマンドを登録（GUILD_IDが.envにあればギルド限定、なければグローバル）
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
                const sessionId = await manager.startRecording(channel as any);
                await interaction.editReply(`Recording started! Session ID: ${sessionId}`);
            } catch (error: any) {
                await interaction.editReply(`Failed to start recording: ${error.message}`);
            }
        }

        if (subcommand === 'stop') {
            const member = interaction.member as any;
            const channel = member?.voice.channel;

            if (!channel) {
                return interaction.reply({ content: 'Please join the voice channel where I am recording.', ephemeral: true });
            }

            manager.stopRecording(channel.id);
            await interaction.reply('Recording stopped and saved.');
        }
    }
});

mainBot.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return;
    // 従来のコマンドも一応残しておく（必要なければ削除可能）
    if (message.content === '!record register') {
        const guildId = message.guildId || undefined;
        await manager.registerCommands(guildId);
        message.reply('Slash commands registered!');
    }
});

console.log('Voice Recorder Manager is starting...');
