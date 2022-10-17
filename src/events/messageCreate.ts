import { client } from "../mod.ts";
import { hasInvite } from "../util/antiInvites.ts";

export default client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // anti-invites
    if (hasInvite(message.content) && !await message.member?.roles.get("883786808062787594")) {
        message.channel.send("hey! don't send invites...");

        message.delete();
    }
});
