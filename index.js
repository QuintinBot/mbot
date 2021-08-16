const Discord = require('discord.js'); // Require discord.js
const client = new Discord.Client(); // Create the bot client.
const { MusicBot } = require('discord-music-system'); // Require the best package ever created on NPM (= require discord-music-system)

client.musicBot = new MusicBot(client, {
    ytApiKey: 'YouTube API key',
    prefix: '-',
    language: 'en'
});

client.on('message', async message => {
    if(message.author.bot) {
        return;
    };
    client.musicBot.onMessage(message);
});

client.login(process.env.token);