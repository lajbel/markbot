import type { Command, DocPiece } from "../types.ts";
import { Embed } from "harmony";
import { fixValue, UnionTypes } from "../util/typeFix.ts";
import kaboom2000Doc from "../doc/2000.json" with { type: "json" };
import kaboom3000Doc from "../doc/3000.json" with { type: "json" };

const docs = {
    "2000": {
        doc: kaboom2000Doc.types,
        url: "https://2000.kaboomjs.com/",
    },
    "3000": {
        doc: kaboom3000Doc.types,
        url: "https://kaboomjs.com/",
    },
};

const cmd: Command = {
    name: "doc",
    description: "get info from kaboom documentation",
    options: [
        {
            name: "element",
            description: "doc element to search",
            type: "STRING",
            required: true,
        },
        {
            name: "version",
            description: "kaboom version",
            type: "STRING",
            choices: [
                { name: "3000", value: "3000" },
                { name: "2000", value: "2000" },
            ],
            required: false,
        },
    ],
    exe: (interaction) => {
        const selectedDoc = docs[interaction.options?.[1]?.value != "3000" ? "2000" : "3000"];
        const kaboomCtxMembers = selectedDoc.doc.KaboomCtx[0].members;
        const searchingDoc = Object.keys(kaboomCtxMembers).find((k) => k.toLowerCase() === interaction.options?.[0].value.toLowerCase()) as string;

        const displayData = {
            mainDoc: {} as DocPiece,
            otherWays: [] as DocPiece[],
        };

        let docMembers: Array<{
            name: string;
            parameters: any;
            type: any;
            jsDoc: any;
        }>;

        if (interaction.options?.[0].value.toLowerCase() === "kaboom") {
            docMembers = selectedDoc.doc["kaboom"];
        } else {
            // @ts-ignore Fix this
            docMembers = kaboomCtxMembers[searchingDoc];
        }

        if (!docMembers) {
            return interaction.respond({ content: "**ERROR:** Function not founded on Kaboom Documentation", ephemeral: true });
        }

        docMembers.forEach((e, i) => {
            const title = e.name + `(${
                e.parameters?.map((p: any) => {
                    return `${p.name}: ${p?.type?.typeName || fixValue(p?.type) || UnionTypes(p?.type?.types)}`;
                }).join(", ")
            }): ${e.type?.typeName || " "}`;
            const description = e.jsDoc?.doc || " ";
            const exampleCode = e.jsDoc?.tags?.example || "";

            if (i === 0) {
                displayData.mainDoc = { title, description, exampleCode };
            } else {
                displayData.otherWays.push({ title, description, exampleCode });
            }
        });

        const embed = new Embed()
            .setColor(0xFF7070)
            .setTitle(displayData.mainDoc.title)
            .setDescription(
                `${displayData.mainDoc.description} [View in Kaboom doc](${selectedDoc.url}#${docMembers[0].name})\n${displayData.mainDoc.exampleCode}${
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
