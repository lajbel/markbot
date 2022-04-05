import {
	Bot,
	DiscordenoInteraction,
	InteractionResponseTypes,
	sendInteractionResponse,
} from "../../deps.ts";

export default () => {
	return {
		name: "say ohhi",
		type: 3,
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const msg = interaction.data?.resolved?.messages?.array()[0];

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					content: `<:oh:952678706927775784><:hi:952678717526798398> <@${msg
						?.authorId}>`,
				},
			});
		},
	};
};
