const Discord = require("discord.js");

module.exports = {
    name: "embed",
    alias: [],
    run: (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR") || message.author.id == "658650587679948820") return message.channel.send("you can't use this command you are noob haha");

        let arr = args.join(' ').split('|')
        
        message.delete();
        message.channel.send(new Discord.MessageEmbed().setTitle(arr[0]).setDescription(arr[1]).setThumbnail(arr[2]))
    }
};
