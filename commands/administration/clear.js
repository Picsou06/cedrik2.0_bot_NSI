const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

let data = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear messages! 🧹")
    .setDescriptionLocalizations({
        fr: "Permet de supprimer des messages! 🧹",
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option
            .setName("amount")
            .setNameLocalizations({
                fr: "nombre",
            })
            .setDescription("Number of messages to delete")
            .setDescriptionLocalizations({
                fr: "Nombre de messages à supprimer",
            })
            .setRequired(true)
    );

data.integration_types = [0, 1];

module.exports = {
    data: data,

    callback: async (client, interaction) => {
        const amount = interaction.options.getInteger("amount");
        if (amount < 1 || amount > 100) {
            return interaction.reply({
                content: "Le nombre de messages à supprimer doit être compris entre 1 et 100.",
                ephemeral: true,
            });
        }

        await interaction.channel.bulkDelete(amount, true);

        await interaction.reply({
            content: `J'ai supprimé ${amount} messages.`,
            ephemeral: true,
        });
    },
};
