module.exports = {
    name: "hi",
    alias: ["h"],
    run: (client, message, args) => {
        return message.channel.send("Hi");
    }
};