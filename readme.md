# Mark Bot 🤖

Mark Bot is a Discord Bot for moderate, configurate and give fun in the [Kaboom](https://github.com/replit/kaboom) [Discord Server](https://discord.gg/rD8GQqdxqe)

![mark](markbot.png)

## Contribute 🎉

Make commits that are useful, make sure it works well and don't try to give yourself privileges or try to break the operation

### Cool Commits

- New commands and interactions
- Fix bugs or typo

## Build 🏗️

For build Markbot in your own repository, you can fork this or clone in local (git and deno is needed)

```sh
# Clone repository
git clone https://github.com/lajbel/markbot.git
# Run
deno run -A  source/mod.ts
```

Optionality you can [**Fork in Replit**](https://replit.com/@lajbel/denomark)

### Add a Command

In `source/commands` make a new `.ts` file, and use this command template:

```ts
import { sendInteractionResponse, SlashCommandInteraction, DiscordApplicationCommandOptionTypes, DiscordInteractionResponseTypes } from "https://deno.land/x/discordeno/mod.ts";

export default function newCommand() {
  	return {
		name: "newCommand",
		description: "A new cool command for MarkBot",
		options: [/* Your command options */],
		exe: (interaction: SlashCommandInteraction) => {
			console.log("my new command is here");
		}
	};
};
```

Your new command is automatically loaded by `mod.ts` and uploaded in a slash command

## Powered By 🚀

[DiscorDeno 🦕](https://github.com/discordeno/discordeno) - Very very good lib for interact with Discord API <br> 
[Replit 🌀](https://replit.com) - IDE and
Hosting of MarkBot
