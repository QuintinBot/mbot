module.exports = {
    name: 'ticket',
    aliases: [],
    premissions: [],
    description: 'Open een ticket',
    async execute(message, args, cmd, client, discord){
        const channel = await message.guild.channels.create('ticket: ${message.author.tag}');
        channel.setParent('862301165302448149');

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        })
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        });

        const reactionMessage = await channel.send('Dankje dat je ons contact!');

        try{

            await reactionMessage.react("🔒");
            await reactionMessage.react("⛔");
        }catch(err){
            channel.send('Error sending emojis')
            throw err;
        }
        const collector = reactionMessage.createReactionCollector((reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission('ADMINISTRATOR'),
        { dispose: true }
        );

        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name){
                case "🔒":
                    channel.updateOverwrite(message.author, { SEND_MESSAGE: flase});
                    break;
                case "⛔":
                    channel.send('De channel wordt verwijderd in 5 seconde!');
                    setTimeout(() => channel.delete(), 5000);
                    break;
            }
        });

        message.channel.send('We komen zo bij je! ${channel}').then((msg) => {
            setTimeout(() => msg.delete(), 7000);
            setTimeout(() => message.delete(), 3000);
        }).catch((err) => {
            throw err;
        });
    },
};