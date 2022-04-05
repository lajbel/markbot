import {
	Bot,
	ButtonStyles,
	DiscordenoInteraction,
	InteractionResponseTypes,
	MessageComponentTypes,
	sendInteractionResponse,
} from "../../deps.ts";

export default () => {
	return {
		name: "roles",
		type: 1,
		description: "get a ka-role",
		options: [],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const embed = {
				color: 0xffe359,
				title: "Roles of Kaboom Discord",
				description:
					"<@&901298683906240582> - You will be mentioned by people who need help\n<@&901533627802873876> - You will be mentioned for announcements",
			};

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				private: true,
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: {
					embeds: [embed],
					components: [
						{
							type: 1,
							components: [
								{
									type: MessageComponentTypes.Button,
									label: "Helper",
									customId: "helper_button",
									style: ButtonStyles.Primary,
									emoji: {
										id: "884813519961342002",
										name: "kbmhearth",
									},
								},
								{
									type: MessageComponentTypes.Button,
									label: "Announcements",
									customId: "announcements_button",
									style: ButtonStyles.Secondary,
									emoji: {
										id: "914611006838284310",
										name: "kbm_pineapple",
									},
								},
							],
						},
					],
				},
			});
		},
	};
};
