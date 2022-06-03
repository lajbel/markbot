import { MessageComponentPayload, MessageComponentType } from "../../deps.ts";
import { MarkCommand } from "../types/command.ts";
import { jams } from "../util/jams.ts";

const cmd: MarkCommand = {
	name: "markjam",
	description: "get info about mark jam",
	options: [{
		name: "jam",
		type: "NUMBER",
		description: "the markjam edition",
		choices: [
			{
				name: "Mark Jam 1: Mark a Mark Game",
				value: 0,
			},
			{
				name: "Mark Jam 2: Into Space 🚀",
				value: 1,
			},
		],
		required: true,
	}],
	exe: async (interaction) => {
		const entries = await (await (await fetch(`https://itch.io/jam/${jams[interaction.options?.[0].value]}/entries.json`))
			.json()).jam_games;

		const select: MessageComponentPayload = {
			type: MessageComponentType.SELECT,
			custom_id: "markjamchoose",
			placeholder: entries.length ? "Choose a game..." : "No games have been submitted yet.",
			options: [],
		};

		if (entries.length) {
			entries.forEach((entry: any) => {
				if (select.options?.length != 25) {
					select.options?.push({
						label: entry.game.title,
						description: entry.game.short_text,
						value: entry.game.id + "/" + jams[interaction.options?.[0].value],
					});
				}
			});
		} else {
			select.options?.push({
				label: "No games have been submitted yet.",
				value: "noGames",
			});
		}

		interaction.respond({
			embeds: [{
				color: 0xffe359,
				title: "Mark Jam",
				description:
					"Markjam is a recurrent game jam about mark, you can make games, books, comics, any thing, with mark, obviously \n\n[**Visit current MarkJam**](https://markjam.repl.co)",
				thumbnail: { url: "https://imgur.com/43BkXZ0.gif" },
			}],
			components: [
				{
					type: "ACTION_ROW",
					components: [select],
				},
			],
		});
	},
};

export default cmd;
