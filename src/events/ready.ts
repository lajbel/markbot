import { client } from "../mod.ts";
import { important } from "../util/logger.ts";

export default client.on("ready", () => {
	important(`markbot is online in ${client.user?.tag}!`);

	console.log(`	                                           
_____ _____ _____ _____ _____ _____ _____ 
|     |  _  | __  |  |  | __  |     |_   _|
| | | |     |    -|    -| __ -|  |  | | |  
|_|_|_|__|__|__|__|__|__|_____|_____| |_|  
												 

MarkBot © Licensed by Bean Tecnologies & Co.
	`);

	const funnyStatus = [
		"KABOOM",
		"BEAN",
		"Kaboom Server",
		"Kaboom Playground",
		"Family Friendly Words",
		"Powerful",
		"KaJam 2069",
		"kaboomjs.com",
		"buying FIREWORKS in kaboom.com",
		"twitter.com/kaboomjs",
		"discord.gg/kaboom in a future",
		"Mark",
		"Increible Games",
		"Mark Jam 2: INTO SPACE",
		"New Kaboom games on Itch.io",
		"New Kaboom games on Newgrounds.com",
		"Replit Kaboom Template",
		"How many Marks are needed for change a 💡",
	];

	function editFunnyStatus() {
		client.setPresence({
			name: funnyStatus[Math.floor(Math.random() * funnyStatus.length)],
			type: "WATCHING",
			status: "online",
		});
	}

	setInterval(() => {
		editFunnyStatus();
	}, 120000);

	editFunnyStatus();
});
