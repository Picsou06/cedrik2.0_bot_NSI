import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "ban",
  description: "Ban a user! 🚫",
  userPermissions: ["BanMembers"],
  botPermissions: ["BanMembers"],
  category: "Administration",
  cooldown: 5,

  run: async ({ client, message, args, prefix }) => {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("Please mention a user to ban.");
    }

    const member = message.guild.members.cache.get(user.id);

    if (member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return message.reply("You cannot ban a moderator.");
    }

    await member.ban();

    message.reply(`I have banned ${user.tag}.`);
  },
};
