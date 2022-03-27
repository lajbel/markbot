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
        description: "[Visit MarkJam](https://itch.io/jam/mark-jam)",
        color: 0xffe359
      }

      const entries = await (fetch('https://itch.io/jam/317800/entries.json').then(res => res.json())).jam_games

      const select: Object = {
        type: MessageComponentTypes.SelectMenu,
        custom_id: 'markjamchoose',
        placeholder: entries.length ? 'Choose a game...' : 'No games have been submitted yet.',
        disabled: !!entries.length,
        options: [],
      }

      if (entries.length) {
        entries.forEach(entry => {
          if (options.length != 25) {
            select.options.push({
              label: entry.game.title,
              description: entry.game.short_text,
              value: entry.game.id
            })
          }
        })
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
