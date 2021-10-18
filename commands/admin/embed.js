const Discord = require("discord.js");

module.exports = {
    name: "embed",
    alias: [],
    run: (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you can't use this command you are noob haha");

        return message.channel.send("WORK IN PROGRESS. ATTE: LaJBel")
    }
};