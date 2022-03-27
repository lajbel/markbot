import {
	Bot,
	DiscordenoInteraction,
	InteractionResponseTypes,
	sendInteractionResponse,
} from "../../deps.ts";

export default () => {
	return {
		name: "markjamchoose",
		exe: async (bot: Bot, interaction: DiscordenoInteraction) => {
			if (interaction.data?.values?.[0][0] == "0") {
				return sendInteractionResponse(bot, interaction.id, interaction.token, {
					type: InteractionResponseTypes.ChannelMessageWithSource,
					data: { content: "No games" },
					private: true,
				});
			}

			const game =
				await (await (await fetch("https://itch.io/jam/317800/entries.json"))
					.json()).jam_games.filter((game) =>
						game.id == interaction.data?.values?.[0][0]!
					);

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: 7,
				data: {
					embeds: [{
						title: game.title,
						author: { name: game.user.name },
						description: `[View this entry](${game.url})`,
						color: 0xffe359,
					}],
				},
			});
		},
	};
};
