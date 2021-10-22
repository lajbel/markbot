module.exports = {
    name: "demo",
    alias: [],
    run: (client, message, args) => {
        message.channel.send("https://kaboomjs.com/play?demo=" + args[0]);
    }
};