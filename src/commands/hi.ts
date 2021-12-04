import { ApplicationCommandOptionTypes, Bot, DiscordenoInteraction, getUser, InteractionResponseTypes, sendInteractionResponse } from "../deps/discordeno.ts";

export default () => {
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
		exe: async (bot: Bot, interaction: DiscordenoInteraction) => {
			const member = interaction?.data?.resolved?.members?.first() || interaction?.member;
			const user = await getUser(bot, member?.id!);

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: { content: `Oh hi ${member?.nick ?? user?.username}` },
			});
		},
	};
};
