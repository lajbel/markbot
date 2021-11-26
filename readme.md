# Mark Bot 🤖

Mark Bot is a Discord Bot for moderate, configurate and give fun in the [Kaboom](https://github.com/replit/kaboom) Discord Server

![mark](markbot.png)

[**Fork in Replit**](https://replit.com/@lajbel/denomark) **-** [**Discord Server**](https://discord.com/invite/aQ6RuQm3TF)

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

# Run project
deno run -A  source/mod.ts
```

Additionality, you can install [Velociraptor] for use vr scripts in `velociraptor.yaml` like `vr dev`

### .env

Env file structure:
```env
TOKEN=TOKENBOT
ID=CLIENTID
```

### Add a Command

In `src/commands` make a new `.ts` file, and use this command template:

```ts
import { 
	sendInteractionResponse,
	Bot,
	DiscordenoInteraction, 
	DiscordApplicationCommandOptionTypes, 
	DiscordInteractionResponseTypes
} from "../deps.ts";

export default function newCommand() {
	return {
		name: "newCommand",
		description: "A new cool command for MarkBot",
		options: [
			/* Your command options */
		],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			console.log("my new command is here");
		},
	};
}
```

Your new command is automatically loaded by `mod.ts` and uploaded in a slash command

## Powered By 🚀

[Discordeno 🦕](https://github.com/discordeno/discordeno) - Very very good lib for interact with Discord API <br> 
[Replit 🌀](https://replit.com) - Hosting of MarkBot (thanks to @slmjkdbtl)
