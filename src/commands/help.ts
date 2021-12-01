import { Bot, ButtonStyles, DiscordenoInteraction, InteractionResponseTypes, MessageComponentTypes, sendInteractionResponse } from "../deps/discordeno.ts";
import { commands } from "../mod.ts";

export default () => {
	return {
		name: "help",
		description: "Get help of me",
		options: [],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const cmds: string[] = [];
			commands.forEach((c) => cmds.push("`" + c.name + "`"));

			const embed = {
				color: 0xffe359,
				title: "Mark Bot Help",
				description: "Haha I am Mark Bot. You can use `/` for see all my commands",
				fields: [
					{
						name: "Commands",
						value: cmds.join(" - "),
						inline: false,
					},
				],
			};

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					embeds: [embed],
					components: [
						{
							type: 1,
							components: [
								{
									type: MessageComponentTypes.Button,
									label: "GitHub",
									style: ButtonStyles.Link,
									url: "https://github.com/lajbel/markbot",
									emoji: { id: "915652987186217020", name: "github" },
								},
								{
									type: MessageComponentTypes.Button,
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
