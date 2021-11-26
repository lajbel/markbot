import { 
	sendInteractionResponse,
	Bot,
	DiscordInteractionResponseTypes,
	DiscordenoInteraction,
} from "../deps.ts";

export default function kaboomCommand() {
	return {
		name: "kaboom",
		description: "KaBoom!!!",
		options: [],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const funnyKaboom = ["https://imgur.com/EFhRwqF.gif", "https://imgur.com/dZyIaSR.gif", "https://imgur.com/aYobVCy.gif", "https://imgur.com/BI875Rq.gif"];

			const response = funnyKaboom[Math.floor(Math.random() * funnyKaboom.length)];

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				data: {content: response},
			});
		},
	};
}
