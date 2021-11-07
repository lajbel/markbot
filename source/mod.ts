// Import Modules ///////////////

import { 
    startBot, 
    setBotId, 
    setApplicationId, 
    createSlashCommand, 
    CreateGlobalApplicationCommand 
} from "https://deno.land/x/discordeno/mod.ts";

// Events

import { ready } from "./events/ready.ts";
import { interactionCreate } from "./events/interactionCreate.ts";

// Bot /////////////////////////

const token = Deno.env.get("TOKEN")!;

startBot({
    token: token,
    intents: ["Guilds", "GuildMessages"],
    eventHandlers: {
        ready,
        interactionCreate
    },
});

setApplicationId("905921669619658752");
setBotId("905921669619658752");

// Load Commands ////////////////

export const commands = new Map();

for await (const file of Deno.readDir("source/commands")) {
    if (file.name.endsWith('.ts')) {
        import(`./commands/${file.name}`).then(file => {
            const cmd = file.default;
            const command = cmd();

            const commandOptions: CreateGlobalApplicationCommand = {
                name: command.name,
                description: command.description
            };

            createSlashCommand(commandOptions, 883781994583056384n);

            commands.set(command.name, command);
        });
    };
};