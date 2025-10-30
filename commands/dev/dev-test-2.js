const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
require("dotenv").config();

let data = new SlashCommandBuilder()
    .setName("dev-test2")
    .setDescription("Commande de test pour les développeurs")
    .setDescriptionLocalizations({
        fr: "Commande de test pour les développeurs",
    })
    .addUserOption(option =>
        option.setName("user")
            .setNameLocalizations({
                fr: "utilisateur",
            })
            .setDescription("Utilisateur cible de la commande")
            .setRequired(true)
    );

data.integration_types = [0, 1];

module.exports = {
    data: data,

    callback: async (client, interaction) => {

        const devId = process.env.DEV_ID;
        if (interaction.user.id !== devId) {
            return interaction.reply({
                content: "Vous n'avez pas la permission d'utiliser cette commande."
            });
        }
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id);

        if (member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: "C'est non."
            });
        }

        await member.timeout(60000);

        interaction.reply({
            content: `C'est good pour ${user.tag}.`
        });
    },
};
