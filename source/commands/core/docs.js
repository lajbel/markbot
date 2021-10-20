const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "docs",
    alias: ["d"],
    run: (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("0xffe359")
        .setTitle("Docs")
        .setDescription("[New Docs](https://kaboomjs.com) | [Old Docs (v0.5.0)](https://kaboomlegacy.repl.co) | [Dev Docs](https://kaboom.dev)");

        message.channel.send(embed);
    }
};