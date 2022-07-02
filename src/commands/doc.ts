import { MarkCommand } from "../types/command.ts";

function UnionTypes(types) {
	return types.map((t) => {
		return fixValue(t);
	}).join(" | ");
}

function funcType(type) {
	return `() => ${fixValue(type.type)}`;
}

function arrType(type) {
	return `${fixValue(type.elementType)}[]`;
}

function litType(type) {
	return fixValue(type.literal);
}

function fixValue(t): string | void {
	if (t.typeName) return "`" + t.typeName + "`";
	switch (t.kind) {
		case "FunctionType":
			return funcType(t);
		case "ArrayKeyword":
			return "`[]`";
		case "ArrayType":
			return arrType(t);
		case "LiteralType":
			return litType(t);

		// keywords lol

		case "NumberKeyword":
			return "`number`";
		case "StringKeyword":
			return "`string`";
		case "BooleanKeyword":
			return "`boolean`";
		case "NullKeyword":
			return "`null`";
		case "VoidKeyword":
			return "`void`";
	}
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
			otherWays: "",
		};

		let doc;

		if (interaction.options?.[0].value.toLowerCase() === "kaboom") doc = kaboomDoc["kaboom"];
		else {
			doc = ctxDoc[Object.keys(ctxDoc).find((k) => k.toLowerCase() === interaction.options?.[0].value.toLowerCase())!];
		}

		if (!doc) {
			return interaction.respond({ content: "**ERROR:** Function not founded on Kaboom Documentation", ephemeral: true });
		}

		docToShow.title = doc[0].name + `(${
			doc[0].parameters?.map((e) => {
				return `${e.name}: ${e?.type?.typeName || fixValue(e?.type) || UnionTypes(e?.type?.types)}`;
			}).join(", ")
		}): ${doc[0].type?.typeName || " "}`;
		docToShow.description = doc[0].jsDoc?.doc || " ";
		docToShow.exampleCode = doc[0].jsDoc?.tags?.example || "Without example.";

		// more doc
		for (let i = 1; i < doc.length; i++) {
			const title = doc[i].name + `(${
				doc[i].parameters?.map((e) => {
					return `${e.name}: ${e?.type?.typeName || fixValue(e?.type) || UnionTypes(e?.type?.types)}`;
				}).join(", ")
			}): ${doc[i].type?.typeName || " "}`;
			const description = doc[i].jsDoc?.doc || " ";
			const exampleCode = doc[i].jsDoc?.tags?.example || "";

			docToShow.otherWays += `\n**${title}**\n${description}${exampleCode}`;
		}

		interaction.respond({
			embeds: [{
				color: 0xFF7070,
				title: docToShow.title,
				description: `${docToShow.description} [View in Kaboom doc](https://kaboomjs.com/#${
					doc[0].name
				})\n${docToShow.exampleCode}\n${docToShow.otherWays}`,
				footer: { text: `Provided by Kaboomjs.com` },
				thumbnail: { url: "https://kaboomjs.com/site/img/kaboom.png" },
			}],
		});
	},
};

export default cmd;
