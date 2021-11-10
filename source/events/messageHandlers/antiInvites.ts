import { sendMessage, deleteMessage } from "https://deno.land/x/discordeno/mod.ts";

export function antiInvites(message) {
  	if (message.content.match(/(https:\/\/)?(discord.(gg|com)\/(invite\/\w+|\w+))/g)) {
        deleteMessage(message.channel.id, message.id);

		sendMessage(message.channel.id, "No send invites!!! help <@632319035102462004>");
    };
};