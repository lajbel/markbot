const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {    
    const logs = client.guilds.cache.get("883781994583056384").channels.cache.get("900101147572989982");

    const embed = new MessageEmbed()
    .setColor("0xff2134")
    .setTitle("Message Deleted")
    .setDescription('"' + message.content + '"')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
    
    logs.send(embed);
};