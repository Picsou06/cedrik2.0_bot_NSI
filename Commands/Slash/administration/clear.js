import { ApplicationCommandType } from "discord.js";

/**
 * @type {import("../../../index").Scommand}
 */
export default {
    name: "clear",
    description: "Clear messages! 🧹",
    descriptionLocalizations: {
        fr: "Permet de supprimer des messages! 🧹",
    },
    userPermissions: ["ManageMessages"],
    botPermissions: ["ManageMessages"],
    category: "Administration",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            type: 4, // ApplicationCommandOptionType.Integer
            name: "amount",
            nameLocalizations: {
                fr: "nombre",
            },
            description: "Number of messages to delete",
            descriptionLocalizations: {
                fr: "Nombre de messages à supprimer",
            },
            required: true,
        },
    ],

    run: async ({ interaction }) => {
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
