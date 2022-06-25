export function hasInvite(content: string): boolean {
	if (content.match(/(https:\/\/)?((discord|discordapp).((gg\/\w+)|(com\/(invite\/\w+))))/g)) {
		const inviteCode = content.split("/")[content.split("/").length - 1];

		switch (inviteCode) {
			case "replit":
			case "aQ6RuQm3TF":
				return false;
			default:
				return true;
		}
	}

	return false;
}
