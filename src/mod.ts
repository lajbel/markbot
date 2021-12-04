import { ApplicationCommandTypes, Bot, createApplicationCommand, createBot, startBot } from "./deps/discordeno.ts";
import { config, DotenvConfig } from "./deps/dotenv.ts";

import { readDir } from "./util/readDir.ts";

import { interactionCreate } from "./events/interactionCreate.ts";
import { messageCreate } from "./events/messageCreate.ts";
import { messageDelete } from "./events/messageDelete.ts";
import { ready } from "./events/ready.ts";

const env: DotenvConfig = config();

let token = env.TOKEN;
let id = env.ID;

if (!token) token = Deno.env.get("TOKEN")!;
if (!id) id = Deno.env.get("ID")!;

// bot setup
const bot: Bot = createBot({
	token: token,
	botId: BigInt(id),
	applicationId: BigInt(id),
	intents: ["Guilds", "GuildMessages"],
	events: {
		interactionCreate,
		messageCreate,
		messageDelete,
		ready,
	},
});

// load interactions (commands and buttons)
export const commands = new Map();
export const buttonsActions = new Map();

readDir("src/commands", async (file) => {
	const cmd = await import(`./commands/${file.name}`);
	const command = cmd.default();

	createApplicationCommand(bot, {
		name: command.name,
		description: command.description,
		options: command.options,
		type: ApplicationCommandTypes.ChatInput,
	}, 883781994583056384n);

	commands.set(command.name, command);
});

readDir("src/buttons", async (file) => {
	const btn = await import(`./buttons/${file.name}`);
	const button = btn.default();

	buttonsActions.set(button.name, button);
});

// start bot
startBot(bot);
