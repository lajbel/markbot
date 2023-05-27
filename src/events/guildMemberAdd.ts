import { client } from "../client.ts";

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
                    `ohhi **${member.user.username}**, welcome to the Kaboom's Server, a place for talk arround kaboom and games, check some tips for you!\n\n **-** If you need help with code, <#1047066099587502110> is the best place, you can ping <@&901298683906240582>\n **-** You can get roles with \`/roles\` command`,
                image: {
                    url: "https://i.imgur.com/n8KN0wu.gif",
                },
            }],
        });

    setTimeout(wlc, 500);
});
