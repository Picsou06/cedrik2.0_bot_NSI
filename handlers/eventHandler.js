const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
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

  client.on('messageCreate', (message) => {
    if (message.content === 'React please') {
        message.react('😎');
        message.react('👍');
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
          await channel.send({ embeds: [embed] });
      } catch (error) {
          console.error("Failed to send welcome message:", error);
      }
  });

};
