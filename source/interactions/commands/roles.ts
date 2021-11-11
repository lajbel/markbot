import { sendInteractionResponse, ButtonStyles, SlashCommandInteraction, DiscordInteractionResponseTypes, DiscordMessageComponentTypes } from "../../deps.ts";

export default function rolesCommand() {
	return {
		name: "roles",
		description: "Get a role",
		options: [],
		exe: async (interaction: SlashCommandInteraction) => {
			const embed = {
				color: 0xffe359,
				title: "Roles of Kaboom Discord",
				description: "<@&901298683906240582> - <:minimark:883793329647652934> - You will be mentioned by people who need help\n<@&901533627802873876> - <:cowmark:884789264745897994> - You will be mentioned for announcements"
			};

      		sendInteractionResponse(interaction.id, interaction.token, {
        		private: true,
        		type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        		data: { 
					embeds: [embed],
          			components: [
            			{
              				type: 1,
              				components: [
                				{
									type: DiscordMessageComponentTypes.Button,
									label: "Helper",
									customId: "helper_button",
									style: ButtonStyles.Primary,
									emoji: { id: "883793329647652934", name: "minimark" }
                				},
                				{
									type: DiscordMessageComponentTypes.Button,
									label: "Announcements",
									customId: "announcements_button",
									style: ButtonStyles.Primary,
									emoji: { id: "884789264745897994", name: "cowmark" },
                				}
              				],
            			}
          			]
        		}
      		});
    	}
  	};
};
