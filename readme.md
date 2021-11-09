# Mark Bot 🤖

Mark Bot is a Discord Bot for moderate and configurate the
[Kaboom](https://github.com/replit/kaboom)
[Discord Server](https://discord.gg/rD8GQqdxqe)

![mark](markbot.png)

## Contribute 🎉

Make commits that are useful, make sure it works well and don't try to give
yourself privileges or try to break the operation

### Cool Commits

- New Commands
- Fix Commands

## Build 🏗️

For build Markbot in your own repository, you can fork this or clone in local
(git and deno is needed)

```sh
# Clone repository
git clone https://github.com/lajbel/markbot.git
# Run
deno run -A --no-check source/mod.ts
# Format code
deno fmt
```

### Add a Command

In `source/commands` make a new file, and use this command template:

```ts
export default function newCommand() {
  return {
    name: "newCommand",
    description: "A new cool command for MarkBot",
    options: [/* Your command options */],
    exe: (interaction: any) => {
      console.log("my new command is here");
    },
  };
}
```

Your new command is automatically loaded by `mod.ts` and uploaded in Slash
Commands

## Powered By 🚀

[DiscorDeno 🦕](https://github.com/discordeno/discordeno) - Very very good lib
for interact with Discord API <br> [Replit 🌀](https://replit.com) - IDE and
Hosting of MarkBot
