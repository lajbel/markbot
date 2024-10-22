import { Embed } from "@harmony/harmony";
import type { Command } from "../types.ts";

const cmd: Command = {
    name: "asking",
    description: "Get tips about getting help on KAPLAY server",
    exe: (interaction) => {
        const embed = new Embed()
            .setColor(0x6bc96c)
            .setTitle("ohhi! Asking about KAPLAY? Take a look here!")
            .setDescription(
                `
## Asking for help

**1.** Make sure to search the [KAPLAY Documentation](https://kaplayjs.com/doc/kaplay/) first before asking.
**2.** Ask your question in the correct channel, on <#883782079802908772> for little questions and <#1047066099587502110> for big questions.
**3.** Be patient! We're all volunteers here, and we might not be online when you are.

## Sharing code
                
For sharing code in JavaScript, use the following format:

\\\`\\\`\\\`js
// Example
\\\`\\\`\\\`

This will make your code readable
\`\`\`js
kaplay();
loadBean();
debug.log("I can read!");
\`\`\`
`,
            ).setFooter({
                text:
                    "Remember to be kind and respectful to everyone! Help people to help you!",
                icon_url:
                    "https://github.com/kaplayjs/crew/blob/main/assets/objects/heart.png?raw=true",
            }).setAuthor({
                name: "KAPLAY Team",
                icon_url: "https://kaplayjs.com/favicon.png",
            });

        interaction.respond({ embeds: [embed] });
    },
};

export default cmd;
