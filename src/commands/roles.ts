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
						type: "SELECT",
						customID: "get_role",
						options: [
							{
								label: "Helper",
								description: "You will be mentioned by people who need help with code",
								value: "901298683906240582",
								emoji: {
									name: "kbm_hearth",
									id: "884813519961342002",
								},
							},
							{
								label: "Announcements",
								description: "You will be mentioned for announcements",
								value: "901533627802873876",
								emoji: {
									name: "kbm_pineapple",
									id: "914611006838284310",
								},
							},
							{
								label: "Jammer",
								description: "You will be mentioned for jamming",
								value: "959499941183635467",
							},
						],
					},
					// {
					// 	type: "BUTTON",
					// 	customID: "announcements_button",
					// 	label: "Announcements",
					// 	style: "SECONDARY",
					// 	emoji: {
					// 		id: "914611006838284310",
					// 		name: "kbm_pineapple",
					// 	},
					// },
				],
			}],
			ephemeral: true,
		});
	},
};

export default cmd;
