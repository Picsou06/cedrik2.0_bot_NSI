import { EmbedBuilder } from 'discord.js';
import { client } from '../bot.js';

client.on('guildMemberAdd', async (member) => {
    const channelID = "1049270153004728340";
    const channel = member.client.channels.cache.get(channelID);
    if (!channel) {
        console.error("Channel not found!");
        return;
    }

    const user = member.user; // The member object has a user property
    const embed = new EmbedBuilder()
        .setTitle("CodeSensei")
        .setDescription(
            `Bienvenue au nouveau membre !\nBienvenue <@!${user.id}> sur le serveur CodeSensei ! 🎉\nN'oublie pas de te renommer afin qu'on puisse te reconnaître ! 👀`
        )
        .setImage("https://media1.tenor.com/m/_i9AUV0dv_0AAAAd/welcome-banner.gif")
        .setThumbnail(
            "https://cdn.discordapp.com/icons/1049270152023257088/a_63be243e9ce3d1aa86b80a0309d881ce.gif?size=1024"
        )
        .setColor("#00f531");

    try {
        await channel.send({ embeds: [embed] });
    } catch (error) {
        console.error("Failed to send welcome message:", error);
    }
});
