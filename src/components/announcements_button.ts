import { MarkComponent } from "../types/component.ts";

const cpm: MarkComponent = async (interaction) => {
	const role = "901533627802873876";

	if (!await interaction.member?.roles.get(role)) {
		interaction.member?.roles.add(role);

		interaction.respond({
			content: "announcements role added",
			ephemeral: true,
		});
	} else {
		interaction.member?.roles.remove(role);

		interaction.respond({
			content: "announcements role removed",
			ephemeral: true,
		});
	}
};

export default cpm;
