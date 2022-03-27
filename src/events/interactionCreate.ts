import { commands, components } from "../mod.ts";
import { Bot, DiscordenoInteraction } from "../../deps.ts";

export function interactionCreate(
	bot: Bot,
	interaction: DiscordenoInteraction,
) {
	// command only in guild
	if (!interaction.guildId) return;

	const cmd = commands.get(interaction.data?.name);
	const cpm = components.get(interaction.data?.customId);

	if (cmd) return cmd.exe(bot, interaction);
	else if (cpm) return cpm.exe(bot, interaction);
}
