import { 
	getUser,
	sendInteractionResponse,
	Bot,
	ApplicationCommandOptionTypes,
	DiscordenoInteraction,
	DiscordInteractionResponseTypes
} from "../deps.ts";

export default function hiCommand() {
	return {
		name: "hi",
		description: "Oh hi",
		options: [
			{
				type: ApplicationCommandOptionTypes.User,
				name: "user",
				description: "User for say hi",
				required: false,
			},
		],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			let user;

			/*
			i need fix
			user = interaction.data?.resolved?.users?.get(interaction.data!.options![0]!.value!.user!.id)
			*/
		
			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				data: {content: `Oh hi MARK`},
			});
		},
	};
}
