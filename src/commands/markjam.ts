import {
	ApplicationCommandOptionTypes,
	Bot,
	DiscordenoInteraction,
	getUser,
	InteractionResponseTypes,
	sendInteractionResponse,
  Embed,
  MessageComponentTypes
} from "../../deps.ts";

export default () => {
	return {
		name: "markjam",
		description: "get markjam link and see entries",
		exe: async (bot: Bot, interaction: DiscordenoInteraction) => {
      const embed: Embed = {
        title: "MarkJam",
        description: "Markjam is a recurrent game jam about mark, you can make games, books, comics, any thing, with mark, obviously\n\n[Visit MarkJam](https://itch.io/jam/mark-jam)",
        color: 0xffe359,
        thumbnail: { url: 'https://imgur.com/43BkXZ0.gif' }
      }

      const entries = (await (fetch('https://itch.io/jam/317800/entries.json').then(res => res.json()))).jam_games

      const select: Object = {
        type: MessageComponentTypes.SelectMenu,
        customId: 'markjamchoose',
        placeholder: entries.length ? 'Choose a game...' : 'No games have been submitted yet.',
        disabled: entries.length ? true : false,
        options: [],
      }

      if (entries.length) {
        entries.forEach(entry => {
          if (select.options.length != 25) {
            let desc = entry.game.short_text || "No short description given."
            if (desc.length > 100) {
              desc = desc.split('')

              desc.length = 97
              desc.push('...')
              desc = desc.join('')
            } 
            select.options.push({
              label: entry.game.title,
              description: desc,
              value: entry.game.id,
            })
          }
        })
      } else {
        select.options[0] = {
          label: 'No games have been submitted yet.',
          value: 'noGames'
        }
      }

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					embeds: [embed],
          components: [{type:1, components:[select]}]
				},
			});
		},
	};
};
