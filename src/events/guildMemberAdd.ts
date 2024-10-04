import { Embed, TextChannel } from "@harmony/harmony";
import { client, KAPLAY_GUILD } from "../client.ts";

const WELCOME_CHANNEL = "926198028061253672";

export default client.on("guildMemberAdd", async (member) => {
    const welcomeChannel = await member.guild.channels.get(WELCOME_CHANNEL);
    if (!(welcomeChannel instanceof TextChannel)) return;

    const rolesCommandId =
        (await client.interactions.commands.for(KAPLAY_GUILD).all())?.find((
            c,
        ) => c.name === "roles")?.id;

    if (!rolesCommandId) return console.log("roles command not found");

    const embed = new Embed()
        .setColor(0x6bc96c)
        .setTitle(
            `<:oh:952678706927775784><:hi:952678717526798398> <@${member.user.id}>`,
        )
        .setDescription(
            `ohhi **${member.user.username}**, welcome to the KAPLAY's Server, a place for talk arround kaboom and games, check some tips for you!
            - If you need help with code, <#1047066099587502110> is the best place, you can ping <@&901298683906240582>
            - You can get roles with </roles:${rolesCommandId}> command`,
        )
        .setImage("https://i.imgur.com/iWKt5Rc.gif");

    const wlc = () =>
        welcomeChannel.send({
            content:
                `<:oh:952678706927775784><:hi:952678717526798398> <@${member.user.id}>`,
            embeds: [embed],
        });

    setTimeout(wlc, 500);
});
