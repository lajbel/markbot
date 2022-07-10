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
			"https://tenor.com/view/kaboom-sports-kaboom-boom-explode-gif-16674174",
			"https://tenor.com/view/huge-explosion-boom-explosive-gif-16819858",
			"https://tenor.com/view/kaboom-explosive-nuclear-gif-11413516",
		];

		interaction.reply(kabooms[Math.floor(Math.random() * kabooms.length)]);
	},
};

export default cmd;
