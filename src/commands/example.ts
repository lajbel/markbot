// The examples commmand, where's all user examples. Add, remove, show your examples!
import type { Command } from "../types.ts";
import { decompressCode } from "../util/decompressCode.ts";

const command: Command = {
    name: "example",
    description: "show a embed with a example",
    options: [
        {
            name: "url",
            description: "the url of the example",
            type: "STRING",
            required: true,
        },
    ],
    exe(interaction) {
        const url = interaction.options[0].value as string;
        const urlCode = new URLSearchParams(url).get("code");
        const code = decompressCode(urlCode || "") as string;
        const limitedCode = code.slice(0, 400) + "...";

        interaction.respond({
            embeds: [{
                color: 0xffe359,
                title: "Kaboom Example 💥",
                description: `\`\`\`js\n${limitedCode}\`\`\` \n [Open in Kaboom Playground](${url})`,
            }],
        });
    },
};

export default command;
