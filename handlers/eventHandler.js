const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
const { EmbedBuilder } = require('discord.js');
const { env } = require("process");

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    let eventFiles = getAllFiles(eventFolder);
    eventFiles.sort();

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
  }
  
  client.on('messageCreate', (message) =>{
    if(message.content === 'jiggly'){
      message.channel.send('puff');
    }
  });

  client.on('messageCreate', async (message) => {
    if (message.content === 'React please') {
        message.react('😎');
        message.react('👍');
      }
    if (message.content.toLowerCase().includes('sigma')) {
      if (message.author.id === '769610914135277629') {
        message.channel.send('https://imgcdn.stablediffusionweb.com/2024/10/18/30c98f52-cd04-45ad-b8e1-cdec1508827b.jpg');
      }
      else {
        message.react('1325137637018964041');
      }
    }
    if (message.content.toLowerCase().includes('ratio')) {
      message.react('🤏');
      message.channel.send('https://tenor.com/view/uzui-better-gif-24953549');
    }
    if (message.content.toLowerCase().includes('feur'))
    {
      message.delete();
      const gifmessage = await message.channel.send('https://media1.tenor.com/m/DLDxBkiQ9IYAAAAd/i-saved-you-from-cringe-the-cringe-is-everywhere.gif');
      setTimeout(() => {
        gifmessage.delete();
      }, 10000);
    }
  });

  client.on('guildMemberAdd', async (member) => {
      const channelID = process.env.WELCOME_CHANNEL;
      const channel = member.client.channels.cache.get(channelID);
      if (!channel) {
          console.error("Channel not found!");
          return;
      }
  
      const user = member.user;
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
            await member.setNickname('not renamed');
            await channel.send({ embeds: [embed] });
            const welcomeMessage = await channel.send(`<@!${user.id}>`);
            await welcomeMessage.delete();
      } catch (error) {
          console.error("Failed to send welcome message:", error);
      }
  });

};
