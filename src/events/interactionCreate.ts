import { buttonsActions, commands } from "../mod.ts";
import { Bot, DiscordenoInteraction } from "../../deps.ts";

export function interactionCreate(
	bot: Bot,
	interaction: DiscordenoInteraction,
) {
	// command only in guild
	if (!interaction.guildId) return;

	const cmd = commands.get(interaction.data?.name);
	const btnAction = buttonsActions.get(interaction.data?.customId);

	if (cmd) return cmd.exe(bot, interaction);
	else if (btnAction) return btnAction.exe(bot, interaction);
}
