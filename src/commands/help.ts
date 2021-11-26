import { 
	sendInteractionResponse,
	Bot,
	ButtonStyles,
	DiscordMessageComponentTypes,
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
				title: "Mark Bot Help",
				description: "Haha I am Mark Bot. You can use `/` for see all my commands",
				fields: [
					{
						name: "Commands",
						value: commands,
						inline: false,
					}
				],
			};

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				data: { 
					embeds: [ embed ] ,
					components: [
						{
							type: 1,
							components: [
								{
									type: DiscordMessageComponentTypes.Button,
									label: "GitHub",
									style: ButtonStyles.Link,
									url: "https://github.com/lajbel/markbot",
									emoji: { id: "913874395993366650", name: "github" },
								},
								{
									type: DiscordMessageComponentTypes.Button,
									label: "Replit",
									style: ButtonStyles.Link,
									url: "https://replit.com/@slmjkdbtl/markbot",
									emoji: { id: "913874499731071016", name: "replit" },
								},
							],
						},
					],
				},
			});
		},
	};
}
