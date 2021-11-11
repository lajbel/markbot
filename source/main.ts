/*--------------Import Modules--------------*/

import { createSlashCommand, setApplicationId, setBotId, startBot, CreateGlobalApplicationCommand } from "./deps.ts";
import { readDir } from "./util/readDir.ts";
import { alive } from "./util/alive.ts";

import { ready } from "./events/ready.ts";
import { interactionCreate } from "./events/interactionCreate.ts";
import { messageCreate } from "./events/messageCreate.ts";

/*-----------------Load Bot-----------------*/

startBot({
	token: Deno.env.get("TOKEN")!,
	intents: ["Guilds", "GuildMessages"],
	eventHandlers: {
		ready: ready,
		messageCreate: messageCreate,
		interactionCreate
	}
});

setApplicationId("905921669619658752");
setBotId("905921669619658752");

/*---------Load Commands and Buttons---------*/

export let commands = new Map();
export let commandNames: string[] = [];
export let buttonsActions = new Map();

readDir("source/interactions/commands", (file: any) => {
	import(`./interactions/commands/${file.name}`).then((file: any) => {
		const command = (file.default)();

    	createSlashCommand({
			name: command.name,
			description: command.description,
			options: command.options
    	}, 883781994583056384n);

    	commands.set(command.name, command);
    	commandNames.push(command.name);
	});
});

readDir("source/interactions/buttons", (file: any) => {
	import(`./interactions/buttons/${file.name}`).then((file: any) => {
		const button = (file.default)();

		buttonsActions.set(button.name, button);
	});
});

// run alive for 24/7
alive();