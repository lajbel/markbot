const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "roles",
    alias: [],
    run: (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("0xffe359")
            .setTitle("Roles of Kaboom Discord")
            .setDescription("<@&901298683906240582> - <:minimark:883793329647652934> - You will be mentioned by people who need help\n<@&901533627802873876> - <:cowmark:884789264745897994> - You will be mentioned for announcements");

        message.channel.send(embed).then(msg => {
            msg.react("<:minimark:883793329647652934>").then(() => msg.react("<:cowmark:884789264745897994>"));

            const filter = (r) => { return ["minimark", "cowmark"].includes(r.emoji.name) };

            const collector = msg.createReactionCollector(filter, { time: 14000 })

            collector.on('collect', (reaction, user) => {
                const member = message.guild.members.cache.get(user.id);

                if (reaction.emoji.name == "minimark") {
                    if (member.roles.cache.has("901298683906240582")) member.roles.remove("901298683906240582");
                    else member.roles.add("901298683906240582");
                };

                if (reaction.emoji.name == "cowmark") {
                    if (member.roles.cache.has("901533627802873876")) member.roles.remove("901533627802873876");
                    else member.roles.add("901533627802873876");
                };
            });
        });
    }
};