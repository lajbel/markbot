import { Component } from "../types.ts";

const cpm: Component = async (interaction) => {
    const role = await interaction.guild?.roles.get(interaction.data.values?.[0]!);
    if (!role) return;

    if (!await interaction.member?.roles.get(role.id)) {
        interaction.member?.roles.add(role.id);

        interaction.respond({
            content: `${role.name} role added`,
            ephemeral: true,
        });
    } else {
        interaction.member?.roles.remove(role.id);

        interaction.respond({
            content: `${role.name} role removed`,
            ephemeral: true,
        });
    }
};

export default cpm;
