import { MarkCommand } from "../types.ts";

const cmd: MarkCommand = {
    name: "say hi",
    type: "MESSAGE",
    exe: (interaction) => {
        const user = interaction.resolved.messages[Object.keys(interaction.resolved.messages)[0]].author;

        interaction.reply(`<:oh:952678706927775784><:hi:952678717526798398> <@${user.id}>`);
    },
};

export default cmd;
