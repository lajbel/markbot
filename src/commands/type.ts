import { Embed } from "harmony";
import { Command } from "../types.ts";
import { fixValue, UnionTypes } from "../util/typeFix.ts";
import Kaboom2000Doc from "../doc.json" assert { type: "json" };

const cmd: Command = {
    name: "type",
    description: "Get info of a Kaboom's type",
    options: [{
        name: "element",
        description: "The doc element to search",
        type: "STRING",
        required: true,
    }],
    exe: (interaction) => {
        const types = Kaboom2000Doc.types;

        const embed = new Embed()
            .setColor(0xFF7070)
            .setThumbnail("https://kaboomjs.com/site/img/kaboom.png")
            .setFooter("provided by Kaboomjs.com");

        const docToShow = {
            title: "",
            description: "",
            props: "",
            methods: "",
        };

        const type = types[interaction.options?.[0]?.value]?.[0];
        if (!type) {
            return interaction.respond({
                content: "**ERROR:** Type not found on Kaboom's Documentation",
                ephemeral: true,
            });
        }

        embed.setTitle(type.name);
        embed.setDescription(type.jsDoc?.doc || "There' s no description for this type");

        if (type.name === "KaboomCtx") {
            embed.setDescription(docToShow.description += "\n\n Use `/doc` command to see the KaboomCtx members");
        }

        if (type.kind === "TypeAliasDeclaration") {
            embed.setDescription(type.type.types.map((o) => o.literal.text).join(" | "));
        } else if (type.kind === "ClassDeclaration") {
            for (const memberName in type.members) {
                if (type.name === "KaboomCtx") continue;

                const member = type.members[memberName][0];

                if (member.kind === "PropertyDeclaration") {
                    docToShow.props += `\n**${member.name}:** ${"`" + member.type.typeName + "`" || fixValue(member.type)}`;
                } else if (member.kind === "MethodDeclaration") {
                    docToShow.methods += `\n${member.jsDoc?.tags?.deprecated ? "**(deprecated)**" : " "} \`${
                        member.name + `(${
                            member.parameters?.map((e) => {
                                return `${e.name}: ${e?.type?.typeName || fixValue(e?.type) || UnionTypes(e?.type?.types)}`;
                            }).join(", ")
                        }): ${member.type?.typeName || " "}`
                    }\`: ${member.type.typeName || fixValue(member.type)}`;
                }
            }

            embed.setDescription(embed.description + docToShow.props + docToShow.methods);
        } else if (type.kind === "InterfaceDeclaration") {
            docToShow.description = type.jsDoc.doc + "\n";

            const members = Object.values(type.members).map((member: any) => {
                return member.map((v) => {
                    console.log(v);

                    return `\n${`**${v.name}`}**: ${`\`${fixValue(v.type)}\``}`;
                });
            });

            console.log(members);

            embed.setDescription(docToShow.description + members.join());
        } else {
            embed.setDescription("Type not supported yet");
        }

        interaction.respond({
            embeds: [embed],
        });
    },
};

export default cmd;
