import { editBotStatus, getUser, Bot, ActivityTypes, } from "../deps/discordeno.ts";

export async function ready(bot: Bot) {
	const botUser = await getUser(bot, bot.id);

	console.log(`Mark is online in ${botUser.username}#${botUser.discriminator}!`);

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
					type: ActivityTypes.Watching,
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
