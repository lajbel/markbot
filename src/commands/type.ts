import { Embed } from "../../deps.ts";
import { MarkCommand } from "../types/command.ts";
import { fixValue, UnionTypes } from "../util/typeFix.ts";

const cmd: MarkCommand = {
	name: "type",
	description: "get info of a type",
	options: [{
		name: "element",
		description: "The doc element to search",
		type: "STRING",
		required: true,
	}],
	exe: (interaction) => {
		if (interaction.user.id !== "947683287369912330") return interaction.reply("lajbel wip");

		const kaboomDoc = JSON.parse(Deno.readTextFileSync("src/doc.json")).types;
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

		const doc = kaboomDoc[interaction.options?.[0]?.value]?.[0];

		if (!doc) {
			return interaction.respond({ content: "**ERROR:** Type not founded on Kaboom Documentation", ephemeral: true });
		}

		embed.setTitle(doc.name);
		embed.setDescription(doc.jsDoc?.doc || " ");

		if (doc.name === "KaboomCtx") {
			embed.setDescription(docToShow.description += "\n\n Use `/doc` command to see the KaboomCtx members");
		}

		if (doc.kind === "TypeAliasDeclaration") {
			embed.setDescription(doc.type.types.map((o) => o.literal.text).join(" | "));
		} else if (doc.kind === "ClassDeclaration") {
			for (const memberName in doc.members) {
				if (doc.name === "KaboomCtx") continue;

				const member = doc.members[memberName][0];

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
		} else if (doc.kind === "InterfaceDeclaration") {
			docToShow.description = doc.jsDoc.doc + "\n";

			const members = Object.values(doc.members).map((member: any) => {
				return member.map((v) => {
					console.log(v);

					return `\n${`**${v.name}`}**: ${`\`${fixValue(v.type)}\``}`;
				});
			});

			console.log(members);

			embed.setDescription(docToShow.description + members.join());
		} else {
			embed.setDescription("type not supported yet");
		}

		interaction.respond({
			embeds: [embed],
		});
	},
};

export default cmd;
