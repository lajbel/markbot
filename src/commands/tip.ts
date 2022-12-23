import { MarkCommand } from "../types.ts";

const tips = [
    {
        t: "`npm i kaboom@next` to install the latest dev release that comes with new features (might be unstable and contain breaking change!)",
    },
    {
        t: "```js\nkaboom({\n  burp: true,\n});```",
    },
    {
        t: "mention <@&901298683906240582> for get <#883782079802908772> about kaboom",
    },
    {
        t: "you can use these fonts in your kaboom game without import anything: `apl386`, `apl386o`, `sink`, `sinko`",
    },
    {
        t: "you can do anything with your Kaboom game thanks to the MIT License",
    },
    {
        t: "if you are using node, you can import kaboom as you want, like `blankboom` or `thebestengine`, ```js\nimport bestengine from 'kaboom';\nbestengine();\n```",
    },
    {
        t: "Kaboom has a LOT of great functions and methods!, you can see all of them at kaboomjs.com",
    },
    {
        t: "You can use the `/doc` command to search about kaboom functions on the go!",
    },
];

const cmd: MarkCommand = {
    name: "tip",
    description: "get a tip about the Kaboom World",
    options: [
        {
            name: "tip",
            description: `tip number from 1 to ${tips.length}`,
            type: "NUMBER",
        },
    ],
    exe: (interaction) => {
        const tip = tips[interaction.options[0]?.value - 1] || tips[Math.floor(Math.random() * tips.length)];

        interaction.respond({
            embeds: [{
                color: 0xffe359,
                title: "Kaboom TIP 💥",
                description: tip.t,
            }],
        });
    },
};

export default cmd;
