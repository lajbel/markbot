import { sendInteractionResponse, DiscordInteractionResponseTypes } from "https://deno.land/x/discordeno/mod.ts"

export default function kaboomCommand() {
    return {
        name: "kaboom",
        description: "KaBoom!!!",
        exe: (interaction: any) => {
            const funnyKaboom: string[] = [
                "https://imgur.com/EFhRwqF.gif", 
                "https://imgur.com/dZyIaSR.gif",
                "https://imgur.com/aYobVCy.gif",
                "https://imgur.com/BI875Rq.gif"
            ];

            const response = funnyKaboom[Math.floor(Math.random() * funnyKaboom.length)];

            sendInteractionResponse(interaction.id, interaction.token, {
                type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content: response
                }
            });
        }
    };
};