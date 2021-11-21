import { editBotStatus, Bot, DiscordActivityTypes } from "../deps.ts";

export function ready(bot: Bot) {
	console.log("ka-boom");

	editBotStatus(bot, {
		activities: [
			{
				name: "DenoMark",
				type: DiscordActivityTypes.Watching,
				createdAt: 0,
			},
		],
		status: "online"
	});
}
