import { ActivityTypes, Bot, editBotStatus, getUser } from "../../deps.ts";

export async function ready(bot: Bot) {
	const botUser = await getUser(bot, bot.id);

	console.log(
		`Mark is online in ${botUser.username}#${botUser.discriminator}!`,
	);

	const funnyStatus = [
		"Bean is cool",
		"KABOOM",
		"Kaboom Server",
		"Family Friendly Words",
		"Powerful",
		"KaJam 2025",
		"discord.gg/kaboom",
		"Markz",
		"Increible Games",
		"a",
	];

	function editFunnyStatus() {
		editBotStatus(bot, {
			activities: [
				{
					name: funnyStatus[
						Math.floor(Math.random() * funnyStatus.length)
					],
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
