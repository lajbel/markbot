const Discord = require("discord.js");

module.exports = {
    name: "embed",
    alias: [],
    run: (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you too peasant to use this");

        return message.channel.send("WORK IN PROGRESS. THANKS: LaJBel")
    }
};
