import { Command } from "../types.ts";

const tips = [
    {
        t: "`npm i kaplay@next` to install the latest dev release that comes with new features (might be unstable and contain breaking change!)",
    },
    {
        t: "```js\nkaplay({\n  burp: true,\n});```",
    },
    {
        t: "mention <@&901298683906240582> to get <#883782079802908772> about KAPLAY",
    },
    {
        t: "you can use these fonts in your KAPLAY game without import anything: `apl386`, `apl386o`, `sink`, `sinko`",
    },
    {
        t: "you can do anything with your KAPLAY game thanks to the MIT License",
    },
    {
        t: "if you are using node, you can import kaplay as you want, like `kaplay` or `thebestengine`, ```js\nimport bestengine from 'kaplay';\nbestengine();\n```",
    },
    {
        t: "KAPLAY has a LOT of great functions and methods! you can see all of them at kaplayjs.com",
    },
    {
        t: "You can use the `/doc` command to search about KAPLAY functions on the go!",
    },
];

const cmd: Command = {
    name: "tip",
    description: "Get a tip about the KAWorld",
    options: [
        {
            name: "tip",
            description: `tip number from 1 to ${tips.length}`,
            type: "NUMBER",
        },
    ],
    exe: (interaction) => {
        const tip = tips[interaction.options[0]?.value - 1]
            || tips[Math.floor(Math.random() * tips.length)];

        interaction.respond({
            embeds: [{
                color: 0x6bc96c,
                title: "KAPLAY TIP 🦖",
                description: tip.t,
                footer: {
                    text: `Remember, KAPLAY is love, peace, and unity`,
                    icon_url:
                        "https://cdn.discordapp.com/emojis/1274884425561145355.webp?size=96&quality=lossless",
                },
            }],
        });
    },
};

export default cmd;
