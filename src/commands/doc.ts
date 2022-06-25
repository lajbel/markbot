import { MarkCommand } from "../types/command.ts";
import { xml2js } from "https://deno.land/x/xml2js@1.0.0/mod.ts";

const cmd: MarkCommand = {
	name: "doc",
	description: "get info of doc",
	exe: async (interaction) => {
		const kaboomPageContent = await fetch("https://kaboomjs.com").then(async (r) => {
			return Object(xml2js(await r.text(), {}));
		});

		const kaboomBody =
			kaboomPageContent.elements[1].elements[1].elements[0].elements[2].elements[3].elements[2].elements[4].elements[5].elements[3].elements[0]
				.elements[0]
				.elements[2]
				.elements[3].elements[0].elements[0].elements;

		const code: any = [];

		kaboomBody.forEach((e) => {
			let elm = e.elements?.[0]?.text || e.text;

			if (e.attributes?.class === "hljs-comment") elm = elm + "\n";

			code.push(elm);
		});

		interaction.respond({
			embeds: [{
				color: 0xffe359,
				description: `\`\`\`js\n ${code.join("")} \n\`\`\``,
			}],
		});
	},
};

export default cmd;
