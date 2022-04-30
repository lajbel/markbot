import { MarkCommand } from "../types/command.ts";

const cmd: MarkCommand = {
	name: "kaboom",
	description: "make a kaboom!!! 💥",
	exe: (interaction) => {
		const kabooms = [
			"https://imgur.com/EFhRwqF.gif",
			"https://imgur.com/dZyIaSR.gif",
			"https://imgur.com/aYobVCy.gif",
			"https://imgur.com/BI875Rq.gif",
		];

		interaction.reply(kabooms[Math.floor(Math.random() * kabooms.length)]);
	},
};

export default cmd;
