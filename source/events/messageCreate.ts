import { channelOverwriteHasPermission, sendMessage, DiscordenoMessage, DiscordOverwriteTypes } from "../deps.ts";
import { config } from "../config.ts";

export function messageCreate(message: DiscordenoMessage) {
	// anti-invites for users lol
	if(message.content.match(/(https:\/\/)?(discord.(gg|com)\/(invite\/\w+|\w+))/g)) {
		sendMessage(message.channel.id, "No send invites!!! help <@632319035102462004>");
    };
};
