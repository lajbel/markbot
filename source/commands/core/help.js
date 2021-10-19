const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    alias: [],
    run: (client, message, args) => {
        const commandsArr = [];

        client.commands.map(x => commandsArr.push("`" + x.name + "`"));

        const embed = new MessageEmbed()
        .setDescription(commandsArr.join(" - "))
        .setTitle("HAHA I am MARK, and these are my COMMANDS")
        .setColor("0xffe359");

        message.channel.send(embed);
    }
};