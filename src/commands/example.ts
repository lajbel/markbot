// The examples commmand, where's all user examples. Add, remove, show your examples!
import pako from "https://cdn.skypack.dev/pako";
import { MarkCommand } from "../types.ts";

function decompressStr(str: string) {
    return pako.inflate(
        new Uint8Array(atob(str).split("").map((c) => c.charCodeAt(0))),
        { to: "string" },
    );
}

const command: MarkCommand = {
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
        const code = new URLSearchParams(url).get("code");
        const richCode = decompressStr(code || "") as string;
        const limitedRichCode = richCode.slice(0, 160) + "...";

        interaction.respond({
            embeds: [{
                color: 0xffe359,
                title: "Kaboom Example 💥",
                description: `\`\`\`js\n${limitedRichCode}\`\`\` \n [Open in Kaboom Playground](${url})`,
            }],
        });
    },
};

export default command;
