import { client } from "../mod.ts";
import { hasInvite } from "../util/antiInvites.ts";

export default client.on("messageUpdate", async (before, after) => {
    // anti-invites
    if (hasInvite(before.content) && !await before.member?.roles.get("883786808062787594")) {
        before.channel.send("Don't send invites - <@947683287369912330>");

        before.delete();
    }

    // kaboom's guild log
    if (before.guildID !== "883781994583056384") return;
    if (before.content === after.content) return;

    client.channels.sendMessage("900101147572989982", {
        embeds: [{
            color: 0x52f3ff,
            title: `Message updated`,
            description: `old: "${before.content} \n new: "${after.content}" in <#${before.channel.id}>`,
            author: { name: before.author.tag, icon_url: before.author.avatarURL("gif") },
            image: { url: before.attachments?.[0]?.url },
        }],
    });
});
