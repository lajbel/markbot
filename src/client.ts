import { Client, GatewayIntents } from "harmony";
import "dotenv/load";

import { MarkCommand } from "./types.ts";
import { cmdlog, eventlog } from "./util/logger.ts";

export const client = new Client();
export const commands: Map<string, MarkCommand> = new Map();
export const components = new Map();

client.connect(Deno.env.get("DISCORD_TOKEN_KEY"), [
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
]);

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
            "883781994583056384",
        );

        commands.set(command.name, command);

        cmdlog(`Command loaded -> ${command.name}`);
    });
}

for await (const file of Deno.readDir("src/components")) {
    import(`./components/${file.name}`).then((mod) => {
        const component = mod.default;

        components.set(file.name.slice(0, -3), component);
    });
}
