import "dotenv/load";
import type { Command } from "./types.ts";
import { Client, GatewayIntents } from "harmony";
import { cmdlog, eventlog } from "./util/logger.ts";
import db from "./db.ts";

export const commands: Map<string, Command> = new Map();
export const components: Map<string, any> = new Map();

export const KABOOM_GUILD = "883781994583056384";

export const client = new Client({
    token: Deno.env.get("DISCORD_TOKEN_KEY"),
    intents: [
        GatewayIntents.GUILDS,
        GatewayIntents.GUILD_MESSAGES,
    ],
});

for await (const file of Deno.readDir("src/events")) {
    import(`./events/${file.name}`).then((mod) => {
        mod.default;

        eventlog(`Event loaded -> ${file.name.slice(0, -3)}`);
    });
}

for await (const file of Deno.readDir("src/commands")) {
    import(`./commands/${file.name}`).then((mod) => {
        const command = mod.default;

        client.interactions.commands.create(
            {
                name: command.name,
                type: command.type,
                description: command.description,
                options: command.options,
            },
            KABOOM_GUILD,
        );

        commands.set(command.name, command);

        cmdlog(`Command loaded -> ${command.name}`);
    });
}

db.sync({ drop: false });
client.connect();
