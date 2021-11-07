import { addReaction, sendInteractionResponse, getOriginalInteractionResponse, DiscordInteractionResponseTypes } from "https://deno.land/x/discordeno/mod.ts"

export default function rolesCommand() {
    return {
        name: "roles",
        description: "Get a role",
        exe: async (interaction: any) => {
            const embed = {
                color: 0xffe359,
                title: "Roles of Kaboom Discord",
                description: "<@&901298683906240582> - <:minimark:883793329647652934> - You will be mentioned by people who need help\n<@&901533627802873876> - <:cowmark:884789264745897994> - You will be mentioned for announcements"
            };

            sendInteractionResponse(interaction.id, interaction.token, {
                type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    embeds: [ embed ]
                }
            });
        }
    };
};