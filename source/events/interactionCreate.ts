import { Interaction, DiscordenoMember } from "https://deno.land/x/discordeno/mod.ts";
import { commands, buttonsActions } from "../mod.ts";

export function interactionCreate(interaction: any) {
    const cmd = commands.get(interaction.data.name);
    const btnAction = buttonsActions.get(interaction.data.customId);

    if(cmd) {
        return cmd.exe(interaction);
    } else if (btnAction) {
        return btnAction.exe(interaction);
    }
};