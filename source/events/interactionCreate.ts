import { Interaction, DiscordenoMember } from "https://deno.land/x/discordeno/mod.ts";
import { commands } from "../mod.ts";

export function interactionCreate(interaction: any) {
    console.log("ka-boom");

    const cmd = commands.get(interaction.data.name);

    if(!cmd) return;
    
    cmd.exe(interaction);
};