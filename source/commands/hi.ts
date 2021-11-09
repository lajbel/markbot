import { getUser, sendInteractionResponse, SlashCommandInteraction, DiscordApplicationCommandOptionTypes, DiscordInteractionResponseTypes } from "https://deno.land/x/discordeno/mod.ts";

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
		exe: async (interaction: SlashCommandInteraction) => {
			let member;
			
			if (interaction.data.options) member = await getUser(BigInt(interaction.data.options[0].value));
			else member = interaction.member.user;

			sendInteractionResponse(interaction.id, interaction.token, {
				type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				data: { content: `Oh hi ${member.username}` }
			});
    	}
  	};
};