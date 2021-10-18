const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    alias: [],
    run: (client, message, args) => {
        const commandsArr = [];
        const commands = {}

        client.commands.map(x => {
            commandsArr.push("`" + x.name + "`")
            commands[x.name] = x
        });
        
        if (!args.length) {
            const embed = new MessageEmbed()
            .setDescription(commandsArr.join(" - "))
            .setTitle("HAHA I am MARK, and this is my COMMANDS")
            .setColor("0xffe359");

            message.channel.send(embed);
        } else {
            if (!commands.includes(args[0].toLowerCase())) return message.channel.send("imagine trying to find out about a non-existant command")
            const embed = new MessageEmbed()
            .addFields([
                {name: "Aliases", value: `**${commands[args[0]].alias.join('** | **') || "None"}**`}
            ])
            .setTitle(`!${args[0].toLowerCase()}`)
            .setColor("0xffe359");
        }
    }
};
