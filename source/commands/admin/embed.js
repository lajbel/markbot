const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    alias: [],
    run: (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("you can't use this command you are noob haha");

        let arr = args.join(' ').split('|')

        const embed = new MessageEmbed()
        .setTitle(arr[0])
        .setColor("0xffe359")
        .setDescription(arr[1])
        .setThumbnail(arr[2]);
        
        message.delete();

        message.channel.send(embed);
    }
};
