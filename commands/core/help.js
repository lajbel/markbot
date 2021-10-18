const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    alias: [],
    run: (client, message, args) => {
        const commandsArr = [];

        const commands = client.commands.map(x => commandsArr.push(x.name));

        const embed = new MessageEmbed()

        .setDescription(commandsArr.join(", "))
        .setTitle("Haha i am MARK, and this is my COMMANDS")
        .setColor("0xffe359");

        message.channel.send(embed);
    }
};