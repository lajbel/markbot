import { MarkCommand } from "../types/command.ts";

const cmd: MarkCommand = {
	name: "eval",
	description: "eval something for markbot",
	options: [
		{
			name: "code",
			description: "code to eval",
			type: "STRING",
			required: true,
		},
	],
	exe: (interaction) => {
		const code = interaction.data.options[0].value

		if (interaction.member.id != "947683287369912330") return interaction.reply("lajbel only")

    let resp;
    try {
      interaction.reply(eval(code))
    } catch (err) {
      interaction.reply(err)
    }
	},
};

export default cmd;
