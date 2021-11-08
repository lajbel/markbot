import { addRole, removeRole, sendInteractionResponse, DiscordInteractionResponseTypes } from "https://deno.land/x/discordeno/mod.ts"

export default function helperButton() {
    return {
        name: "helper_button",
        exe: (interaction: any) => {
            const helperRole = "901298683906240582";

            const guildId = BigInt(interaction.guildId);
            const role = BigInt(helperRole);
            const member = BigInt(interaction.member.user.id);

            if(!interaction.member.roles.includes(helperRole)) {
                addRole(guildId, member, role).then(() => {
                    sendInteractionResponse(interaction.id, interaction.token, {
                        private: true,
                        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
                        data: {
                            content: "Helper role added"
                        }
                    });
                });
            } else {
                removeRole(guildId, member, role).then(() => {
                    sendInteractionResponse(interaction.id, interaction.token, {
                        private: true,
                        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
                        data: {
                            content: "Helper role removed"
                        }
                    });
                });
            };
        }
    };
};