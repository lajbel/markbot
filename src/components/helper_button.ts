import { MarkComponent } from "../types/component.ts";

const cpm: MarkComponent = async (interaction) => {
	const role = "901298683906240582";

	if (!await interaction.member?.roles.get(role)) {
		interaction.member?.roles.add(role);

		interaction.respond({
			content: "helper role added",
			ephemeral: true,
		});
	} else {
		interaction.member?.roles.remove(role);

		interaction.respond({
			content: "helper role removed",
			ephemeral: true,
		});
	}
};

export default cpm;
