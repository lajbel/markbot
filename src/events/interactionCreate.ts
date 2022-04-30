import { client, commands, components } from "../mod.ts";

export default client.on("interactionCreate", (interaction) => {
	if (!interaction.guild) return;

	if (interaction.isApplicationCommand()) {
		const cmd = commands.get(interaction.data?.name);

		if (cmd) return cmd.exe(interaction);
	}

	if (interaction.isMessageComponent()) {
		const cpm = components.get(interaction.data?.custom_id);

		if (cpm) return cpm(interaction);
	}
});
