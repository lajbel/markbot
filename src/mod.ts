import {
	ApplicationCommandTypes,
	Bot,
	createApplicationCommand,
	createBot,
	dotenv,
	startBot,
} from "../deps.ts";

import { interactionCreate } from "./events/interactionCreate.ts";
import { messageCreate } from "./events/messageCreate.ts";
import { ready } from "./events/ready.ts";

export const commands = new Map();
export const buttonsActions = new Map();

export const bot: Bot = createBot({
	token: dotenv().TOKEN || Deno.env.get("TOKEN")!,
	botId: BigInt(dotenv().ID || BigInt(Deno.env.get("ID")!)),
	applicationId: BigInt(dotenv().ID || BigInt(Deno.env.get("ID")!)),
	intents: ["Guilds", "GuildMessages"],
	events: {
		interactionCreate,
		messageCreate,
		ready,
	},
});

for await (const file of Deno.readDir("src/commands")) {
	const cmd = await import(`./commands/${file.name}`);
	const command = cmd.default();

	createApplicationCommand(bot, {
		name: command.name,
		description: command.description,
		options: command.options,
		type: ApplicationCommandTypes.ChatInput,
	}, 883781994583056384n);

	commands.set(command.name, command);
}

for await (const file of Deno.readDir("src/buttons")) {
	const btn = await import(`./buttons/${file.name}`);
	const button = btn.default();

	buttonsActions.set(button.name, button);
}

startBot(bot);
