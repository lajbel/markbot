import { ApplicationCommandOptionTypes, Bot, DiscordenoInteraction, DiscordInteractionResponseTypes, sendInteractionResponse } from "../deps.ts";

const tags = {
  kaboom: `**What is Kaboom?**
  
Nice question. I.. uh.. don't know.`
}

export default function tagCommand() {
	return {
		name: "tag",
		description: "Autoresponds to stuff",
		options: [
			{
				type: ApplicationCommandOptionTypes.String,
				name: "tag",
				description: "tag",
				required: true,
			},
		],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				data: { content: `${tags[interaction?.data?.options?[0]?.value?.toLowerCase()] || `Tag ${interaction?.data?.options?[0]?.value?.toLowerCase()} doesn't exist.`}` },
			});
		},
	};
}
