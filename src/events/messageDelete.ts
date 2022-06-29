import { client } from "../mod.ts";

export default client.on("messageDelete", (message) => {
	// kaboom's guild log
	if (message.guildID !== "883781994583056384") return;

	client.channels.sendMessage("900101147572989982", {
		embeds: [{
			color: 0xff5d52,
			title: `Message deleted`,
			description: `"${message.content}" in <#${message.channel.id}>`,
			author: { name: message.author.tag, icon_url: message.author.avatarURL("gif") },
			image: { url: message.attachments?.[0]?.url },
		}],
	});
});
