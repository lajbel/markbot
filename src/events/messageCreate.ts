import { client } from "../mod.ts";

export default client.on("messageCreate", async (message) => {
	const regAI = /(https:\/\/)?((discord|discordapp).((gg\/\w+)|(com\/(invite\/\w+))))/g;

	// anti-invites
	if (
		message.content.match(regAI) &&
		!await message.member?.roles.get("883786808062787594")
	) {
		message.channel.send("Don't send invites - <@947683287369912330>");

		message.delete();
	}
});
