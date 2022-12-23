import { MarkCommand } from "../types.ts";

const cmd: MarkCommand = {
    name: "hi",
    description: "say hi",
    options: [
        {
            name: "user",
            description: "User for say hi",
            type: "USER",
            required: false,
        },
    ],
    exe: (interaction) => {
        const member = interaction.resolved.members[interaction.options?.[0]?.value] || interaction.member;

        interaction.reply(`<:oh:952678706927775784><:hi:952678717526798398> ${member?.nick ?? member?.user.username}`);
    },
};

export default cmd;
