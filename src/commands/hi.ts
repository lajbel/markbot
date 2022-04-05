import {
	ApplicationCommandOptionTypes,
	Bot,
	DiscordenoInteraction,
	getUser,
	InteractionResponseTypes,
	sendInteractionResponse,
} from "../../deps.ts";

export default () => {
	return {
		name: "hi",
		type: 1,
		description: "ohhi",
		options: [
			{
				type: ApplicationCommandOptionTypes.User,
				name: "user",
				description: "User for say hi",
				required: false,
			},
		],
		exe: async (bot: Bot, interaction: DiscordenoInteraction) => {
			const member = interaction?.data?.resolved?.members?.first() ||
				interaction?.member;
			const user = await getUser(bot, member?.id!);

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: `<:oh:952678706927775784><:hi:952678717526798398> ${
						member?.nick ?? user?.username
					}`,
				},
			});
		},
	};
};
