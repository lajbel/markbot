module.exports = {
    name: "ban",
    alias: [],
    run: (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("i ban you haha");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ");

        if (!member.bannable) return message.channel.send("sorry i'm nub");

        member.ban({reason:reason}).then(ban => {
            return message.channel.send(`i ban ${member.user.username}`);
        });
    }
};