import { client } from "../client.ts";
import { hasInvite } from "../util/antiInvites.ts";

export default client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // anti-invites
    if (hasInvite(message.content) && !await message.member?.roles.get("883786808062787594")) {
        message.channel.send("hey! don't send invites...");

        message.delete();
    }

    // kuboom related
    else if (message.content.toLowerCase().includes("kuboom")) {
        let substrIdx = message.content.indexOf("kuboom")
        if (message.content.toLowerCase()[substrIdx - 1] != '!') {
            message.reply("hey! we're the **kaboom.js** game engine discord server, not the _kuboom_ discord server...")
        }
    }
});
