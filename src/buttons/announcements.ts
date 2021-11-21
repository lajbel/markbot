import {
	addRole,
	removeRole,
	sendInteractionResponse,
	Bot,
	DiscordenoInteraction,
	DiscordInteractionResponseTypes
} from "../deps.ts";

export default function announcementsButton() {
	return {
		name: "announcements_button",
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const guildId = interaction.guildId!;
			const member = interaction.member?.id!;
			const role = 901533627802873876n;

			if (!interaction.member?.roles.includes(role)) {
				addRole(bot, guildId, member, role).then(() => {
					sendInteractionResponse(bot, interaction.id, interaction.token, {
						private: true,
						type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
						data: {content: "Announcements role added"},
					});
				});
			} else {
				removeRole(bot, guildId, member, role).then(() => {
					sendInteractionResponse(bot, interaction.id, interaction.token, {
						private: true,
						type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
						data: {content: "Announcements role removed"},
					});
				});
			}
		},
	};
}
