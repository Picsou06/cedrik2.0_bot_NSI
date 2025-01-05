const { SlashCommandBuilder, MessageFlags } = require("discord.js");

require("dotenv").config();

let data = new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Commande pour recharger le bot (développeur uniquement)")
    .setDescriptionLocalizations({
        fr: "Commande pour recharger le bot (développeur uniquement)",
    });

module.exports = {
    data: data,

    callback: async (client, interaction) => {
        const devId = process.env.DEV_ID;
        if (interaction.user.id !== devId) {
            return interaction.reply({
                content: "Vous n'avez pas la permission d'utiliser cette commande.",
                flags: MessageFlags.Ephemeral
            });
        }

        await interaction.reply({
            content: "Le bot va être rechargé...",
            flags: MessageFlags.Ephemeral
        });

        process.exit(0);
    },
};