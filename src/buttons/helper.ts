import { addRole, Bot, DiscordenoInteraction, DiscordInteractionResponseTypes, removeRole, sendInteractionResponse } from "../deps.ts";

export default function helperButton() {
	return {
		name: "helper_button",
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const guildId = interaction.guildId!;
			const member = interaction.member?.id!;
			const role = 901298683906240582n;

			if (!interaction.member?.roles.includes(role)) {
				addRole(bot, guildId, member, role).then(() => {
					sendInteractionResponse(bot, interaction.id, interaction.token, {
						private: true,
						type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
						data: { content: "Helper role added" },
					});
				});
			} else {
				removeRole(bot, guildId, member, role).then(() => {
					sendInteractionResponse(bot, interaction.id, interaction.token, {
						private: true,
						type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
						data: { content: "Helper role removed" },
					});
				});
			}
		},
	};
}
