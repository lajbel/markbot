import "jsr:@std/dotenv/load";
import { Client, GatewayIntents } from "@harmony/harmony";

import type { Command } from "./types.ts";
import { cmdlog, eventlog } from "./util/logger.ts";

export const commands: Map<string, Command> = new Map();
export const components: Map<string, any> = new Map();

export const KAPLAY_GUILD = "883781994583056384";

export const client = new Client({
    token: Deno.env.get("DISCORD_TOKEN_KEY"),
    intents: [
        GatewayIntents.GUILDS,
        GatewayIntents.GUILD_MESSAGES,
    ],
});

if (Deno.env.get("MODE") !== "dev") {
    client.interactions.commands.for(KAPLAY_GUILD).all().then((cmds) => {
        cmds.forEach((cmd) => {
            cmd.delete();
        });
    });

    console.log("Commands deleted");
}

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
            KAPLAY_GUILD,
        );

        commands.set(command.name, command);

        cmdlog(`Command loaded -> ${command.name}`);
    });
}

client.connect();
