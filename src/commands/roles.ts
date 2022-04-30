import { MarkCommand } from "../types/command.ts";

const cmd: MarkCommand = {
	name: "roles",
	description: "get a role",
	exe: (interaction) => {
		interaction.respond({
			embeds: [{
				color: 0xffe359,
				title: "Roles of Kaboom Discord",
				description:
					"<@&901298683906240582> - You will be mentioned by people who need help\n<@&901533627802873876> - You will be mentioned for announcements",
			}],
			components: [{
				type: "ACTION_ROW",
				components: [
					{
						type: "BUTTON",
						customID: "helper_button",
						label: "Helper",
						style: "PRIMARY",
						emoji: {
							id: "884813519961342002",
							name: "kbmhearth",
						},
					},
					{
						type: "BUTTON",
						customID: "announcements_button",
						label: "Announcements",
						style: "SECONDARY",
						emoji: {
							id: "914611006838284310",
							name: "kbm_pineapple",
						},
					},
				],
			}],
			ephemeral: true,
		});
	},
};

export default cmd;
