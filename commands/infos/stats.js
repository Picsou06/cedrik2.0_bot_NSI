const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { getPawned, getPawnedByType } = require("../../utils/setupDb");
require("dotenv").config();

let data = new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Connaitre les statistiques du bot")
    .addUserOption(option => option
        .setName("user")
        .setDescription("Utilisateur dont on veut les statistiques")
        .setRequired(false)
        )
    .addStringOption(option => option
        .setName("choice")
        .setDescription("Type de statistique")
        .setRequired(false)
        .addChoices(
            { name: "Ratio", value: "ratio" },
            { name: "Feur", value: "feur" },
            { name: "Sigma", value: "sigma" }
        )
    );

data.integration_types = [0, 1];

module.exports = {
    data: data,

    callback: async (client, interaction) => {
        if (interaction.user.id !== process.env.DEV_ID)
            return interaction.reply({
                content: "Commande en cours de developpement.",
                flags: MessageFlags.Ephemeral
            });
        const user = interaction.options.getUser("user");
        const choice = interaction.options.getString("choice");

        if (user && choice)
            return interaction.reply({
                content: "Vous ne pouvez pas spécifier un utilisateur et un type de statistique en même temps.",
                flags: MessageFlags.Ephemeral
            });

        if (!user && !choice)
        {

        }

        if (stats.length === 0) {
            return interaction.reply({
                content: "Cet utilisateur n'a pas de statistiques.",
                flags: MessageFlags.Ephemeral
            });
        }

        let message = `Statistiques de ${user.tag}:\n`;

        if (choice === "all") {
            const ratio = stats.filter(stat => stat.Type === "ratio").length;
            const sigma = stats.filter(stat => stat.Type === "sigma").length;
            const feur = stats.filter(stat => stat.Type === "feur").length;

            message += `Ratio: ${ratio}\nSigma: ${sigma}\nFeur: ${feur}`;
        } else {
            const count = stats.filter(stat => stat.Type === choice).length;
            message += `${choice}: ${count}`;
        }

        interaction.reply({
            content: message,
            flags: MessageFlags.Ephemeral
        });
    },
};