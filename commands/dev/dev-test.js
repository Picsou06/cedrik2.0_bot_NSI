const { SlashCommandBuilder, MessageFlags } = require("discord.js");
require("dotenv").config();

let data = new SlashCommandBuilder()
    .setName("dev-test")
    .setDescription("Commande de test pour les développeurs")
    .setDescriptionLocalizations({
        fr: "Commande de test pour les développeurs",
    })
    .addIntegerOption(option =>
        option
            .setName("amount")
            .setDescription("Not yor business")
            .setRequired(true)
    );

data.integration_types = [0, 1];

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

        const amount = interaction.options.getInteger("amount");
        if (amount < 1 || amount > 10) {
            return interaction.reply({
                content: "Le nombre de messages à supprimer doit être compris entre 1 et 100.",
                flags: MessageFlags.Ephemeral
            });
        }

        await interaction.channel.bulkDelete(amount, true);

        await interaction.reply({
            content: "Commande de test exécutée avec succès.",
            flags: MessageFlags.Ephemeral
        });
    },
};