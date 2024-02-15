import type { Command } from "../types.ts";
import Example from "../models/Example.ts";
import { decompressCode } from "../util/decompressCode.ts";

const command: Command = {
    name: "example",
    description: "show a embed with a example",
    options: [
        {
            name: "add",
            description: "add a example",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "title",
                    description: "title of the example",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "description",
                    description: "description of the example",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "url",
                    description: "url of the example",
                    type: "STRING",
                    required: true,
                },
            ],
        },
        {
            name: "show",
            description: "show a example",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "search",
                    description: "id of the example",
                    type: "STRING",
                    required: true,
                },
            ],
        },
        {
            name: "list",
            description: "list all examples",
            type: "SUB_COMMAND",
        },
    ],
    async exe(interaction) {
        if (interaction.subCommand === "add") {
            const title = String(interaction.options[0].value).trim().toLowerCase();
            const description = String(interaction.options[1].value).trim();
            const url = String(interaction.options[2].value);

            const urlCode = new URLSearchParams(url).get("code");
            const code = decompressCode(urlCode || "") as string;
            const limitedCode = code.slice(0, 400) + "...";

            await Example.create({
                title,
                description,
                url: `\`\`\`js\n${limitedCode}\`\`\` \n [Open in Kaboom Playground](${url})`,
                user: interaction.user.id,
            });

            interaction.reply(`Example ${title} added!`);
        } else if (interaction.subCommand === "list") {
            const examples = (await Example.all()).filter((example) => example.user == interaction.user.id).map((example) => {
                return `\`${example.id}\` - ${example.title}`;
            }).join("\n");

            interaction.respond({
                embeds: [{
                    color: 0xfb6d6d,
                    title: "Examples List",
                    description: examples,
                }],
            });
        } else if (interaction.subCommand === "show") {
            const id = Number(interaction.options[0].value) || String(interaction.options[0].value).trim().toLowerCase();
            let example;

            if (typeof id === "number") {
                example = await Example.find(id);
            } else {
                example = await Example.where("title", id).first();
            }
            if (!example) {
                interaction.reply("Example not found");
                return;
            }

            interaction.respond({
                embeds: [{
                    color: 0xfb6d6d,
                    title: `💥 ${example.title}`,
                    description: `${example.description} \n${example.url}`,
                }],
            });
        }
    },
};

export default command;
