import { ApplicationCommandType, PermissionFlagsBits, ApplicationCommandOptionType } from "discord.js";

/**
 * @type {import("../../../index").Scommand}
 */
export default {
  name: "ban",
  description: "Ban a user! 🚫",
  descriptionLocalizations: {
    fr: "Permet de bannir un utilisateur! 🚫",
  },
  userPermissions: ["BanMembers"],
  botPermissions: ["BanMembers"],
  category: "Administration",
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      type: ApplicationCommandOptionType.User, // USER type
      name: "user",
      nameLocalizations: {
        fr: "utilisateur",
      },
      description: "User to ban",
      descriptionLocalizations: {
        fr: "Utilisateur à bannir",
      },
      required: true,
    },
  ],

  run: async ({ interaction }) => {
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
