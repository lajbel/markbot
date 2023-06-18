import { Embed } from "harmony";
import { client, KABOOM_GUILD } from "../client.ts";

const WELCOME_CHANNEL = "926198028061253672";

export default client.on("guildMemberAdd", async (member) => {
    const welcomeChannel = await member.guild.channels.get(WELCOME_CHANNEL);
    if (!welcomeChannel?.isText()) return;

    const rolesCommandId = (await client.interactions.commands.for(KABOOM_GUILD).all())?.find((c) => c.name === "roles")?.id;

    if (!rolesCommandId) return console.log("roles command not found");

    const embed = new Embed()
        .setColor(0xffe359)
        .setTitle(`<:oh:952678706927775784><:hi:952678717526798398> <@${member.user.id}>`)
        .setDescription(
            `ohhi **${member.user.username}**, welcome to the Kaboom's Server, a place for talk arround kaboom and games, check some tips for you!
            - If you need help with code, <#1047066099587502110> is the best place, you can ping <@&901298683906240582>
            - You can get roles with </roles:${rolesCommandId}> command`,
        )
        .setImage("https://i.imgur.com/n8KN0wu.gif");

    const wlc = () =>
        welcomeChannel.send({
            content: `<:oh:952678706927775784><:hi:952678717526798398> <@${member.user.id}>`,
            embed,
        });

    setTimeout(wlc, 500);
});
