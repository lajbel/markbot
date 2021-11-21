import { 
	sendInteractionResponse,
	Bot,
	DiscordenoInteraction,
	DiscordInteractionResponseTypes
} from "../deps.ts";

import { commandNames } from "../mod.ts";

export default function helpCommand() {
	return {
		name: "help",
		description: "Get help of me",
		options: [],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const commands = commandNames.map((x: string) => "`" + x + "`").join(" - ");

			const embed = {
				color: 0xffe359,
				title: "MarkBot Help",
				description: "Haha I am Mark-Bot. You can use `/` for see all my commands",
				fields: [
					{
						name: "Commands",
						value: commands,
						inline: false,
					},
					{
						name: "Links",
						value: "[`Contribute`](https://github.com/lajbel/markbot) - [`Replit`](https://replit.com/@lajbel/markbot)",
						inline: false,
					},
				],
			};

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				data: {embeds: [embed]},
			});
		},
	};
}
