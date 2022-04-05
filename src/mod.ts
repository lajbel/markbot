import { Bot, createApplicationCommand, createBot, dotenv, startBot } from "../deps.ts";

import { cmdlog } from "./util/logger.ts";

import { interactionCreate } from "./events/interactionCreate.ts";
import { messageCreate } from "./events/messageCreate.ts";
import { messageUpdate } from "./events/messageUpdate.ts";
import { ready } from "./events/ready.ts";

export const commands = new Map();
export const components = new Map();

export const bot: Bot = createBot({
	token: dotenv().TOKEN || Deno.env.get("TOKEN")!,
	botId: BigInt(dotenv().ID || BigInt(Deno.env.get("ID")!)),
	applicationId: BigInt(dotenv().ID || BigInt(Deno.env.get("ID")!)),
	intents: ["Guilds", "GuildMessages"],
	events: {
		interactionCreate,
		messageCreate,
		ready,
		messageUpdate,
	},
});

for await (const file of Deno.readDir("src/commands")) {
	const cmd = await import(`./commands/${file.name}`);
	const command = cmd.default();

	createApplicationCommand(bot, {
		name: command.name,
		description: command.description,
		options: command.options,
		type: command.type,
	}, 883781994583056384n);

	commands.set(command.name, command);

	cmdlog("command loaded: " + command.name);
}

for await (const file of Deno.readDir("src/components")) {
	const cmp = await import(`./components/${file.name}`);
	const component = cmp.default();

	components.set(component.name, component);
}

startBot(bot);
