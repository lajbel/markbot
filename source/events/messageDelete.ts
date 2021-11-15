import {getUser, sendMessage, DiscordenoMessage} from "../deps.ts";
import {config} from "../config.ts";

export async function messageDelete(data: any, message: DiscordenoMessage) {
	const user = await getUser(message.authorId);

	// logs for delete messages
	sendMessage(config.logChannel, {
		embeds: [
			{
				color: 0xff2134,
				title: "Message Deleted",
				description: `**"** ${message.content} **"**`,
				author: {
					name: user.username,
					iconUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=64`,
				},
				footer: {text: `deleted in ${data.channel.name}`},
			},
		],
	});
}
