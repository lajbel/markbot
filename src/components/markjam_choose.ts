import { MarkComponent } from "../types/component.ts";

const cpm: MarkComponent = async (interaction) => {
	if (interaction.data.values?.[0] == "noGames") return interaction.reply("no games <:horrormark:918301111826407546>");

	const game = (await (fetch(`https://itch.io/jam/${interaction.data.values?.[0].split("/")[1]}/entries.json`).then((res) => res.json()))).jam_games.filter((
		{ game },
	) => game.id == interaction.data?.values?.[0].split("/")[0])[0].game;

	interaction.respond({
		embeds: [{
			color: 0xffe359,
			title: game.title,
			description: `${game.short_text || "No short description was given for this game."}\n\n[View this entry](${game.url})`,
			image: { url: game.cover },
			thumbnail: { url: "https://imgur.com/43BkXZ0.gif" },
			footer: { text: `This game was created by ${game.user.name}` },
		}],
	});
};

export default cpm;
