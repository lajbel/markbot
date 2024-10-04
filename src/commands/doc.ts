import { Embed } from "@harmony/harmony";
import type { Command, DocPiece } from "../types.ts";
import { fixValue, UnionTypes } from "../util/typeFix.ts";

const docs: Record<string, {
    jsonUrl: string;
    url: string;
}> = {
    "v3001": {
        jsonUrl: "https://kaplayjs.com/doc.json",
        url: "https://kaplayjs.com/ctx/",
    },
};

const cmd: Command = {
    name: "doc",
    description: "Get info from KAPLAY Ctx documentation.",
    options: [
        {
            name: "element",
            description: "Doc element to search from KAPLAYCtx",
            type: "STRING",
            required: true,
        },
        {
            name: "version",
            description: "KAPLAY version",
            type: "STRING",
            choices: [
                { name: "3991", value: "3001" },
            ],
            required: false,
        },
    ],
    exe: async (interaction) => {
        const selectedVersion =
            interaction.options.find((o) => o.name === "version")
                ?.value as string
            || "v3001";
        const selectedDoc = docs[selectedVersion];

        const docsJson = await (await fetch(selectedDoc.jsonUrl)).json();

        if (!docsJson) {
            return interaction.respond({
                content: "**ERROR:** Couldn't fetch the KAPLAY Documentation",
                ephemeral: true,
            });
        }

        const kaplayCtxMembers = docsJson.types.KAPLAYCtx[0].members;
        const searchingDoc = Object.keys(kaplayCtxMembers).find((k) =>
            k.toLowerCase() === interaction.options?.[0].value.toLowerCase()
        ) as string;

        const displayData = {
            mainDoc: {} as DocPiece,
            otherWays: [] as DocPiece[],
        };

        const docMembers: Array<{
            name: string;
            parameters: any;
            type: any;
            jsDoc: any;
        }> = kaplayCtxMembers[searchingDoc];

        if (!docMembers) {
            return interaction.respond({
                content:
                    "**ERROR:** Symbol not found in the KAPLAY Documentation",
                ephemeral: true,
            });
        }

        docMembers.forEach((e, i) => {
            const title = e.name + `(${
                e.parameters?.map((p: any) => {
                    return `${p.name}: ${
                        p?.type?.typeName || fixValue(p?.type)
                        || UnionTypes(p?.type?.types)
                    }`;
                }).join(", ")
            }): ${e.type?.typeName || " "}`;
            const description = e.jsDoc?.doc || " ";
            const exampleCode = e.jsDoc?.tags?.example || "";

            if (i === 0) {
                displayData.mainDoc = { title, description, exampleCode };
            }
            else {
                displayData.otherWays.push({ title, description, exampleCode });
            }
        });

        const embed = new Embed()
            .setColor(0x6bc96c)
            .setTitle(displayData.mainDoc.title)
            .setDescription(
                `${displayData.mainDoc.description} [View in kaplayjs.com](https://kaplayjs.com/doc/ctx/${
                    docMembers[0].name
                })\n${displayData.mainDoc.exampleCode}${
                    displayData.otherWays.concat([]).map((e) => {
                        return `\n**${e.title}**\n${e.description}\n${e.exampleCode}`;
                    }).join("")
                }`,
            )
            .setThumbnail("https://kaboomjs.com/site/img/kaboom.png");

        interaction.respond({ embeds: [embed] });
    },
};

export default cmd;
