import { ApplicationCommandOptionTypes, Bot, DiscordenoInteraction, DiscordInteractionResponseTypes, sendInteractionResponse } from "../deps.ts";

export default function hiCommand() {
	return {
		name: "hi",
		description: "Oh hi",
		options: [
			{
				type: ApplicationCommandOptionTypes.User,
				name: "user",
				description: "User for say hi",
				required: false,
			},
		],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const member = interaction?.data?.resolved?.members?.first() || interaction?.member
			
			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				data: { content: `Oh hi ${member?.nick}` },
			});
		},
	};
}
