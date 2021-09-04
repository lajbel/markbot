module.exports = (client, message) => {
    const prefix = "!";

    if(message.content.startsWith(prefix) && !message.author.bot) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.aliases.get(command);

        if(cmd) cmd.run(client, message, args);
    };
};