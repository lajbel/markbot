import { sendMessage, DiscordenoMessage } from "../deps.ts";

export function messageCreate(message: DiscordenoMessage) {
	if(message.content.match(/(https:\/\/)?(discord.(gg|com)\/(invite\/\w+|\w+))/g)) {
		sendMessage(message.channel.id, "No send invites!!! help <@632319035102462004>");
    };
};
