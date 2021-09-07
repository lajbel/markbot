module.exports = {
    name: "hi",
    alias: ["h"],
    run: (client, message, args) => {
        return message.channel.send("Oh hi " + message.author.username);
    }
};