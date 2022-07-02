import { MarkCommand } from "../types/command.ts";

const cmd: MarkCommand = {
	name: "roles",
	description: "get a role",
	exe: (interaction) => {
		interaction.respond({
			embeds: [{
				color: 0xffe359,
				title: "Roles of Kaboom Discord",
				description: "Select a role in the below list. Re-select if you want to remove the role.",
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
									name: "ka_heart",
									id: "884813519961342002",
								},
							},
							{
								label: "Announcements",
								description: "You will be mentioned for announcements",
								value: "901533627802873876",
								emoji: {
									name: "ka_pineapple",
									id: "914611006838284310",
								},
							},
							{
								label: "Jammer",
								description: "You will be mentioned for jamming",
								value: "959499941183635467",
								emoji: {
									name: "ka_pizza",
									id: "914610944791949352",
								},
							},
						],
					},
				],
			}],
			ephemeral: true,
		});
	},
};

export default cmd;
