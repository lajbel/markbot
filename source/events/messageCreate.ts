import { commandHandler } from "./messageHandlers/commands.ts";
import { antiInvites } from "./messageHandlers/antiInvites.ts";

export function messageCreate(message) {
	antiInvites(message);
	commandHandler(message);
};
