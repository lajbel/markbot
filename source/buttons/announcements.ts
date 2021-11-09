import { addRole, removeRole, sendInteractionResponse, DiscordInteractionResponseTypes } from "https://deno.land/x/discordeno/mod.ts";

export default function announcementsButton() {
	return {
		name: "announcements_button",
		exe: (interaction: any) => {
			const announcementesRole = "901533627802873876";

			const guildId = BigInt(interaction.guildId);
			const role = BigInt(announcementesRole);
			const member = BigInt(interaction.member.user.id);

			if (!interaction.member.roles.includes(announcementesRole)) {
        		addRole(guildId, member, role).then(() => {
          			sendInteractionResponse(interaction.id, interaction.token, {
            			private: true,
            			type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
            			data: { content: "Announcements role added" }
          			});
        		});
      		} 
			else {
        		removeRole(guildId, member, role).then(() => {
          			sendInteractionResponse(interaction.id, interaction.token, {
            			private: true,
            			type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
            			data: { content: "Announcements role removed" },
          			});
        		});
      		};
    	}
  	};
};