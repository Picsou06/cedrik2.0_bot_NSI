const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

let data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping! 🏓")
  .setDescriptionLocalizations({
    fr: "Ping du bot",
  })
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  .setDMPermission(false)

data.integration_types = [0, 1];

module.exports = {
  data: data,

  callback: async (client, interaction) => {
    interaction.reply(`🏓Ping is ${(Date.now() - interaction.createdTimestamp)*-1}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  },
};
