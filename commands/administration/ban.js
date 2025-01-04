const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

let data = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user! 🚫")
    .setDescriptionLocalizations({
        fr: "Permet de bannir un utilisateur! 🚫",
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption(option =>
        option.setName("user")
            .setNameLocalizations({
                fr: "utilisateur",
            })
            .setDescription("User to ban")
            .setDescriptionLocalizations({
                fr: "Utilisateur à bannir",
            })
            .setRequired(true)
    );

data.integration_types = [0, 1];

module.exports = {
    data: data,

    callback: async (client, interaction) => {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id);

        if (member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: "Vous ne pouvez pas bannir un modérateur.",
                ephemeral: true,
            });
        }

        await member.ban();

        interaction.reply({
            content: `J'ai banni ${user.tag}.`,
            ephemeral: true,
        });
    },
};
