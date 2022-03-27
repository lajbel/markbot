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
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const game = await (fetch('https://itch.io/jam/317800/entries.json').then(res => res.json())).jam_games.filter({game} => game.id == interaction.data.values[0])[0]

      sendInteractionResponse(bot, interaction.id, interaction.token, {
        type: 7,
        data: {
          embeds: [{
            title: game.title,
            author: {name: game.user.name},
            description: `[View this entry](${game.url})`,
            color: 0xffe359
          }]
        }
      })
		},
	};
};
