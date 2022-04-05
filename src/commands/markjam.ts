import {
	Bot,
	DiscordenoInteraction,
	Embed,
	InteractionResponseTypes,
	MessageComponentTypes,
	SelectMenuComponent,
	sendInteractionResponse,
} from "../../deps.ts";

export default () => {
	return {
		name: "markjam",
		type: 1,
		description: "get info about mark jam",
		exe: async (bot: Bot, interaction: DiscordenoInteraction) => {
			const embed: Embed = {
				title: "Mark Jam",
				description:
					"Markjam is a recurrent game jam about mark, you can make games, books, comics, any thing, with mark, obviously \n\n[**Visit current MarkJam**](https://markjam.repl.co)",
				color: 0xffe359,
				thumbnail: { url: "https://imgur.com/43BkXZ0.gif" },
			};

			const entries =
				await (await (await fetch("https://itch.io/jam/317800/entries.json"))
					.json()).jam_games;

			const select: SelectMenuComponent = {
				type: MessageComponentTypes.SelectMenu,
				customId: "markjamchoose",
				placeholder: entries.length
					? "Choose a game..."
					: "No games have been submitted yet.",
				options: [],
			};

			if (entries.length) {
				entries.forEach((entry: any) => {
					if (select.options.length != 25) {
						select.options.push({
							label: entry.game.title,
							description: entry.game.short_text,
							value: entry.game.id,
						});
					}
				});
			} else {
				select.options.push({
					label: "No games have been submitted yet.",
					value: "noGames",
				});
			}

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					embeds: [embed],
					components: [
						{
							type: 1,
							components: [select],
						},
					],
				},
			});
		},
	};
};
