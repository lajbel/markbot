import { Command } from "../types.ts";
import { fixValue, UnionTypes } from "../util/typeFix.ts";
// import jsons
import { types as kaboom2000Doc } from "../doc/2000.json" assert { type: "json" };
import { types as kaboom3000Doc } from "../doc/3000.json" assert { type: "json" };

type DocPiece = {
    title: string;
    description: string;
    exampleCode: string;
};

const docs = {
    "2000": {
        doc: kaboom2000Doc,
        url: "https://2000.kaboomjs.com/",
    },
    "3000": {
        doc: kaboom3000Doc,
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
            docMembers = selectedDoc["kaboom"];
        } else {
            docMembers = kaboomCtxMembers[searchingDoc];
        }

        if (!docMembers) {
            return interaction.respond({ content: "**ERROR:** Function not founded on Kaboom Documentation", ephemeral: true });
        }

        docMembers.forEach((e, i) => {
            const title = docMembers[i].name + `(${
                docMembers[i].parameters?.map((e) => {
                    return `${e.name}: ${e?.type?.typeName || fixValue(e?.type) || UnionTypes(e?.type?.types)}`;
                }).join(", ")
            }): ${docMembers[i].type?.typeName || " "}`;
            const description = docMembers[i].jsDoc?.doc || " ";
            const exampleCode = docMembers[i].jsDoc?.tags?.example || "";

            if (i === 0) {
                displayData.mainDoc = { title, description, exampleCode };
            } else {
                displayData.otherWays.push({ title, description, exampleCode });
            }
        });

        interaction.respond({
            embeds: [{
                color: 0xFF7070,
                title: displayData.mainDoc.title,
                description: `${displayData.mainDoc.description} [View in Kaboom doc](${selectedDoc.url}#${
                    docMembers[0].name
                })\n${displayData.mainDoc.exampleCode}${
                    displayData.otherWays.concat([]).map((e) => {
                        return `\n\n**${e.title}**\n${e.description}\n${e.exampleCode}`;
                    }).join("")
                }`,
                thumbnail: { url: "https://kaboomjs.com/site/img/kaboom.png" },
            }],
        });
    },
};

export default cmd;
