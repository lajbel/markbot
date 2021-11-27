import { Bot, DiscordActivityTypes, editBotStatus } from "../deps.ts";

export function ready(bot: Bot) {
	console.log("ka-boom");

	const funnyStatus = [
		"Bean...",
		"Your mom",
		"Kaboom Server",
		"Family Friendly Words",
		"Powerful",
		"Kajam 2025",
		"discord.gg/kaboom",
		"Mark Z",
		"Kaboom 6969",
	];

	function editFunnyStatus() {
		editBotStatus(bot, {
			activities: [
				{
					name: funnyStatus[Math.floor(Math.random() * funnyStatus.length)],
					type: DiscordActivityTypes.Watching,
					createdAt: 0,
					buttons: [
						{
							label: "Contribute",
							url: "https://github.com/lajbel/markbot",
						},
					],
				},
			],
			status: "online",
		});
	}

	setInterval(() => {
		editFunnyStatus();
	}, 120000);

	editFunnyStatus();
}
