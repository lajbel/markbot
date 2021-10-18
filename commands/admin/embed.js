const Discord = require("discord.js");

module.exports = {
    name: "embed",
    alias: [],
    run: (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("i ban you haha");

        return message.channel.send("WORK IN PROGRESS. ATTE: LaJBel")
    }
};