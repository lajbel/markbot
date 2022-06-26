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

function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
		return index === 0 ? word.toLowerCase() : word.toUpperCase();
	}).replace(/\s+/g, "");
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
		};

		if (interaction.options?.[0]?.value) {
			let doc;

			if (interaction.options?.[0].value === "kaboom") doc = kaboomDoc["kaboom"][0];
			else {
				doc = ctxDoc[camelize(interaction.options?.[0]?.value)]?.[0];
			}

			if (!doc) {
				return interaction.reply("**ERROR:** Function not founded on Kaboom Documentation");
			}

			docToShow.title = doc.name + `(${
				doc.parameters?.map((e) => {
					return `${e.name}: ${e?.type?.typeName || fixValue(e?.type) || UnionTypes(e?.type?.types)}`;
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
				footer: { text: "Provided by Kaboomjs.com" },
			}],
		});
	},
};

export default cmd;
