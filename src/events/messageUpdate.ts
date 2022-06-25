import { client } from "../mod.ts";

export default client.on("messageUpdate", async (before, after) => {
	const regAI = /(https:\/\/)?((discord|discordapp).((gg\/\w+)|(com\/(invite\/\w+))))/g;

	// anti-invites
	if (
		before.content.match(regAI) &&
		!await before.member?.roles.get("883786808062787594")
	) {
		before.channel.send("Don't send invites - <@947683287369912330>");

		before.delete();
	}

	// kaboom's guild log
	if (before.guildID !== "883781994583056384") return;

	client.channels.sendMessage("900101147572989982", {
		embeds: [{
			color: 0xffe359,
			title: `Message updated`,
			description: `old: "${before.content} \n new: "${after.content}" in <#${before.channel.id}>`,
			author: { name: before.author.tag, icon_url: before.author.avatarURL("gif") },
			image: { url: before.attachments?.[0]?.url },
		}],
	});
});
