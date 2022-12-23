import { MarkCommand } from "../types.ts";

const cmd: MarkCommand = {
    name: "game",
    description: "get a random kaboom game of itch.io",
    exe: async (interaction) => {
        const games = await (await (await fetch(
            "https://api.factmaven.com/xml-to-json/?xml=https://itch.io/games/tag-kaboomjs.xml",
        )).json()).rss.channel.item;

        const game = games[Math.floor(Math.random() * games.length)];

        console.log(game);

        interaction.respond({
            embeds: [{
                color: 0xffe359,
                title: game.plainTitle,
                description: `[**Play game on Itch.io**](${game.link})`,
                image: { url: game.imageurl },
            }],
        });
    },
};

export default cmd;
