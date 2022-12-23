import { Client, config, GatewayIntents, ReplDB } from "../deps.ts";
import { MarkCommand } from "./types.ts";
import { cmdlog, eventlog } from "./util/logger.ts";

export const client = new Client();
export const commands: Map<string, MarkCommand> = new Map();
export const components = new Map();

export const db = new ReplDB(Deno.env.get("REPLIT_DB_URL") || config().REPLIT_DB_URL);

client.connect(Deno.env.get("DISCORD_TOKEN") || config().DISCORD_TOKEN, [
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
    GatewayIntents.GUILD_MEMBERS,
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
