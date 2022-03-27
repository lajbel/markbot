import {
	addRole,
	Bot,
	DiscordenoInteraction,
	InteractionResponseTypes,
	removeRole,
	sendInteractionResponse,
} from "../../deps.ts";
// yes it is a select menu, but i can't be bothered to make new code for select menus

export default () => {
	return {
		name: "markjamchoose",
		exe: async (bot: Bot, interaction: DiscordenoInteraction) => {
      if (interaction.data.values[0] == "noGames") return sendInteractionResponse(bot, interaction.id, interaction.token, { type: InteractionResponseTypes.ChannelMessageWithSource, private: true, data: { content: 'No games 😔' } })
			const game = (await (fetch('https://itch.io/jam/317800/entries.json').then(res => res.json()))).jam_games.filter(({game}) => game.id == interaction.data.values[0])[0]

      sendInteractionResponse(bot, interaction.id, interaction.token, {
        type: 7,
        data: {
          embeds: [{
            title: game.game.title,
            author: {name: `This game was created by ${game.game.user.name}`},
            description: `${game.game.short_text || "No short description was given for this game."}

[View this entry](${game.game.url})`,
            color: 0xffe359,
            image: { url: game.game.cover },
            thumbnail: { url: 'https://imgur.com/43BkXZ0.gif' }
          }]
        }
      })
		},
	};
};
