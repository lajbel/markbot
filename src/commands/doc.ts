import { MarkCommand } from "../types/command.ts";

const fixedValues = {
	"NumberKeyword": "number",
};

function UnionTypes(types) {
	return types.map((t) => {
		return t.typeName || fixedValues[t.kind];
	}).join(" | ");
}

const cmd: MarkCommand = {
	name: "doc",
	description: "get info of doc",
	options: [{
		name: "element",
		description: "The doc element to search",
		type: "STRING",
		required: true,
	}],
	exe: (interaction) => {
		const kaboomDoc = JSON.parse(Deno.readTextFileSync("src/doc.json")).types;
		const ctxDoc = kaboomDoc.KaboomCtx[0].members;

		const docToShow = {
			title: "",
			description: "",
			exampleCode: "",
		};

		if (interaction.options?.[0]?.value) {
			let doc;

			if (interaction.options?.[0].value === "kaboom") doc = kaboomDoc["kaboom"][0];
			else {
				doc = ctxDoc[interaction.options?.[0]?.value?.toLowerCase()]?.[0];
			}

			if (!doc) {
				return interaction.reply("**ERROR:** Function not founded on Kaboom Documentation");
			}

			docToShow.title = doc.name + `(${
				doc.parameters?.map((e) => {
					return `${e.name}: ${e?.type?.typeName || fixedValues[e?.type?.kind] || UnionTypes(e?.type?.types)}`;
				}).join(", ")
			}): ${doc.type.typeName || " "}`;
			docToShow.description = doc.jsDoc?.doc || " ";
			docToShow.exampleCode = doc.jsDoc?.tags?.example || "Without example.";
		}

		interaction.respond({
			embeds: [{
				color: 0xffe359,
				title: docToShow.title,
				description: `${docToShow.description}\n${docToShow.exampleCode}`,
			}],
		});
	},
};

export default cmd;
