module.exports = {
    name: "hi",
    alias: ["h", "hello"],
    run: (client, message, args) => {
        return message.channel.send("Oh hi " + message.author.username);
    }
};