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
		if (interaction.user.id !== "947683287369912330") return interaction.reply("lajbel wip XD");

		const kaboomDoc = JSON.parse(Deno.readTextFileSync("src/doc.json")).types;

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

		docToShow.title = doc.name;
		docToShow.description = doc.jsDoc?.doc || " ";

		for (const memberName in doc.members) {
			const member = doc.members[memberName][0];

			console.log(member);

			if (member.kind === "PropertyDeclaration") {
				docToShow.props += `\n\`${member.name}\`: ${member.type.typeName || fixValue(member.type)}`;
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

		interaction.respond({
			embeds: [{
				color: 0xFF7070,
				title: docToShow.title,
				description: `${docToShow.description}\n${docToShow.props}\n\n${docToShow.methods}`,
				footer: { text: "Provided by Kaboomjs.com" },
				thumbnail: { url: "https://kaboomjs.com/site/img/kaboom.png" },
			}],
		});
	},
};

export default cmd;
