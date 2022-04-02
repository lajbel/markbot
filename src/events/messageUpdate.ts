import { Bot, deleteMessage, DiscordenoMessage, sendMessage } from "../../deps.ts";

export function messageUpdate(bot: Bot, oldMessage: DiscordenoMessage, newMessage: DiscordenoMessage): any {
	const regAI = /(https:\/\/)?((discord|discordapp).((gg\/\w+)|(com\/(invite\/\w+))))/g;

	// anti-invites for users lol
	if (
		newMessage.content.match(regAI) &&
		!newMessage.member?.roles.includes(883786808062787594n)
	) {
		sendMessage(bot, newMessage.channelId, {
			content: "No send invites!!! help <@947683287369912330>",
		});

		deleteMessage(bot, newMessage.channelId, newMessage.id);
	}
}
