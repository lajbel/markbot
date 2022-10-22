import { client } from "../mod.ts";

export default client.on("guildMemberAdd", async (member) => {
    const welcomeChannel = await member.guild.channels.get("926198028061253672");
    if (!welcomeChannel?.isText()) return;

    const wlc = () =>
        welcomeChannel.send({
            content: `<:oh:952678706927775784><:hi:952678717526798398> <@${member.user.id}>`,
            embeds: [{
                color: 0xffe359,
                title: "OHHI",
                description:
                    `ohhi **${member.user.username}**, welcome to the Kaboom Server, a place for talk arround kaboom and indie games, check some tips for you!\n\n **-** If you need help with code, <#883782079802908772> is the best place, you can ping <@&901298683906240582>\n **-** You can get roles with \`/roles\` command\n **-** You can access to more languages with \`/language\``,
                image: {
                    url: "https://i.imgur.com/n8KN0wu.gif",
                },
            }],
        });

    setTimeout(wlc, 500);
});
