import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
} from "https://deno.land/x/discordeno/mod.ts";
import { commandNames } from "../mod.ts";

export default function helpCommand() {
  return {
    name: "help",
    description: "Get a guide of my commands",
    options: [],
    exe: (interaction: any) => {
      const commands = commandNames.map((x: string) => "**" + x + "**").join(
        " - ",
      );

      const embed = {
        color: 0xffe359,
        author: { name: "MarkBot Commands" },
        description:
          `Haha I am Mark-Bot, and these are my powerful commands\n\n${commands}`,
      };

      sendInteractionResponse(interaction.id, interaction.token, {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds: [embed],
        },
      });
    },
  };
}
