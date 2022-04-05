import { ActivityTypes, Bot, editBotStatus, getUser } from "../../deps.ts";
import { important } from "../util/logger.ts";

export async function ready(bot: Bot) {
	const botUser = await getUser(bot, bot.id);

	important(`markbot is online in ${botUser.username}#${botUser.discriminator}!`);

	console.log(`	                                           
_____ _____ _____ _____ _____ _____ _____ 
|     |  _  | __  |  |  | __  |     |_   _|
| | | |     |    -|    -| __ -|  |  | | |  
|_|_|_|__|__|__|__|__|__|_____|_____| |_|  
												 

MarkBot © Licensed by Bean Tecnologies & Co.
	`);

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
		"Mark Jam",
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
