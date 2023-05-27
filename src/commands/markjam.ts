import { Embed } from "harmony";
import { MarkCommand } from "../types.ts";

const cmd: MarkCommand = {
    name: "markjam",
    description: "get info about mark jam",
    exe: (interaction) => {
        const embed = new Embed()
            .setTitle("MarkJam")
            .setColor(0xff3359)
            .setDescription(
                "Markjam is a recurrent game jam about mark, you can make games, books, comics, any thing, with mark, obviously",
            )
            .setImage("https://img.itch.zone/aW1nLzk5ODMyODMucG5n/315x250%23c/YxzSPZ.png");

        interaction.respond({ embeds: [embed] });
    },
};

export default cmd;
