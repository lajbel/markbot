<img src="https://imgur.com/pmAkJ18.png" />

Mark Bot is a Discord Bot for give fun and moderate the **[Kaboom](https://github.com/replit/kaboom) Discord Server**

[**Fork in Replit**](https://replit.com/@slmjkdbtl/markbot#src/mod.ts) **-** [**Kaboom Discord Server**](https://discord.com/invite/aQ6RuQm3TF)

## Contribute 🎉

Make commits that are useful, make sure it works well and don't try to give yourself privileges or try to break the bot

### Cool Commits

- New FUN commands
- New content for `/kaboom` or `/tip`
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

**ENV Variables**

Token: Discord Client token

### Add a command

In `src/commands` make a new `.ts` file, and use this command template:

```ts
import { MarkCommand } from "../types/command.ts";

const cmd: MarkCommand = {
	name: "hi",
	description: "say hi",
	options: [
		{
			name: "user",
			description: "User for say hi",
			type: "USER",
			required: false,
		},
	],
	exe: (interaction) => {
		// epic things
	},
};

export default cmd;
```

Your new command is automatically loaded by `mod.ts`.

## Powered By 🚀

[Harmony 🦕](https://deno.land/harmony) - Cool library for interact with Discord API <br>
[Replit 🌀](https://replit.com) - Hosting of MarkBot thanks to [tga](https://github.com/slmjkdbtl), Kaboom creator <br>
[Kaboom Discord 💥](discord.gg/aq6ruqm3tf) - Official Kaboom Discord, develop indie games now are fun and easy
