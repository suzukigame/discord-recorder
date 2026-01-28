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

// メインBot (Bot 1) でコマンドを待機
if (!mainBot) {
    console.error('Main Bot client is not initialized.');
    process.exit(1);
}

mainBot.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return;

    if (message.content === '!record start') {
        const channel = message.member?.voice.channel;
        if (!channel || channel.type !== ChannelType.GuildVoice) {
            return message.reply('Please join a voice channel first!');
        }

        try {
            if (message.channel.isTextBased()) {
                await (message.channel as TextChannel).send('Starting recording...');
            }
            const sessionId = await manager.startRecording(channel as any);
            message.reply(`Recording started! Session ID: ${sessionId}`);
        } catch (error: any) {
            message.reply(`Failed to start recording: ${error.message}`);
        }
    }

    if (message.content === '!record stop') {
        const channel = message.member?.voice.channel;
        if (!channel) {
            return message.reply('Please join the voice channel where I am recording.');
        }

        manager.stopRecording(channel.id);
        message.reply('Recording stopped and saved.');
    }
});

console.log('Voice Recorder Manager is starting...');
