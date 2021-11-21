import { 
	getMember,
	sendInteractionResponse,
	Bot,
	DiscordApplicationCommandOptionTypes,
	DiscordenoInteraction,
	DiscordInteractionResponseTypes
} from "../deps.ts";

export default function hiCommand() {
	return {
		name: "hi",
		description: "Oh hi",
		options: [
			{
				type: DiscordApplicationCommandOptionTypes.User,
				name: "user",
				description: "User for say hi",
				required: false,
			},
		],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			let member;

			/*
			if (interaction.data?.options) member = await getMember(bot, interaction.guildId!, interaction.data?.options[0]?.value?.user.id)
			else member = interaction.member

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				data: {content: `Oh hi ${member.nickname}`},
			});
			*/
		},
	};
}
