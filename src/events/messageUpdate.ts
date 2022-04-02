import { Bot, deleteMessage, DiscordenoMessage, sendMessage } from "../../deps.ts";

export function messageUpdate(
	bot: Bot,
	message: DiscordenoMessage,
	_oldMessage: DiscordenoMessage | undefined,
): any {
	const regAI = /(https:\/\/)?((discord|discordapp).((gg\/\w+)|(com\/(invite\/\w+))))/g;

	// anti-invites for users lol
	if (
		message.content.match(regAI) &&
		!message.member?.roles.includes(883786808062787594n)
	) {
		sendMessage(bot, message.channelId, {
			content: "No send invites!!! help <@947683287369912330>",
		});

		deleteMessage(bot, message.channelId, message.id);
	}
}
