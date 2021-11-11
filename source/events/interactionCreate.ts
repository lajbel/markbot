import { DiscordenoMember, Interaction } from "../deps.ts";
import { buttonsActions, commands } from "../main.ts";

export function interactionCreate(interaction: Interaction, member?: DiscordenoMember) {
	const cmd = commands.get(interaction.data.name);
	const btnAction = buttonsActions.get(interaction.data.customId);

	if (cmd) return cmd.exe(interaction);
	else if (btnAction) return btnAction.exe(interaction);
};
