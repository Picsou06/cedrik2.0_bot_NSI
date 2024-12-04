/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
    name: "clear",
    description: "Clear messages! 🧹",
    userPermissions: ["ManageMessages"],
    botPermissions: ["ManageMessages"],
    category: "Administration",
    cooldown: 5,

    run: async ({ client, message, args, prefix }) => {
        const amount = parseInt(args[0], 10);
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply({
                content: "Le nombre de messages à supprimer doit être compris entre 1 et 100.",
                ephemeral: true,
            });
        }

        await message.channel.bulkDelete(amount, true);

        await message.reply({
            content: `J'ai supprimé ${amount} messages.`,
            ephemeral: true,
        });
    },
};
