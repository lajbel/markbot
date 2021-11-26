import {
	config,
	createSlashCommand, 
	createBot,
	startBot,
	ApplicationCommandTypes,
	Bot,
	DotenvConfig
} from "./deps.ts";

import { readDir } from "./util/readDir.ts";
import { alive } from "./util/alive.ts";

import { interactionCreate } from "./events/interactionCreate.ts";
import { messageCreate } from "./events/messageCreate.ts";
import { messageDelete } from "./events/messageDelete.ts";
import { ready } from "./events/ready.ts";

const env: DotenvConfig = config();

let token = env.TOKEN;
let id = env.ID;

if(!token) token = Deno.env.get("TOKEN")!;
if(!id) id = Deno.env.get("ID")!;

// bot setup
const bot: Bot = createBot({
	token: token,
	botId: BigInt(id),
	applicationId: BigInt(id),
	events: {
		interactionCreate,
		messageCreate,
		messageDelete,
		ready
	},
	intents: ["Guilds", "GuildMessages"],
	cache: {
		isAsync: false,
	},
});

// load interactions (commands and buttons)
export const commands = new Map();
export const commandNames: string[] = [];
export const buttonsActions = new Map();

readDir("src/commands", (file) => {
	import(`./commands/${file.name}`).then((file: any) => {
		const command = file.default();

		createSlashCommand(bot, {
			name: command.name,
			description: command.description,
			options: command.options,
			type: ApplicationCommandTypes.ChatInput
		}, 883781994583056384n);

		commands.set(command.name, command);
		commandNames.push(command.name);
	});
});

readDir("src/buttons", (file) => {
	import(`./buttons/${file.name}`).then((file: any) => {
		const button = file.default();

		buttonsActions.set(button.name, button);
	});
});

// start bot
startBot(bot);
