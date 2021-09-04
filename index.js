// Require Modules

const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();

for(const dir of readdirSync("./commands")) {
    for(const file of readdirSync("./commands/" + dir)) {
        if(file.endsWith(".js")) {
            const content = require(`./commands/${dir}/${file}`);
            const key = content.name;

            client.commands.set(key, content);

            if(content.alias) {
                for(const key of content.alias) {
                    client.aliases.set(key, content);
                };
            };
        };
    };
};

for(const file of readdirSync("./events")) {
    if(file.endsWith(".js")) {
        const content = require(`./events/${file}`)
        const key = file.substring(0, file.length - 3);

        client.on(key, content.bind(null, client));
    };
};

client.login(process.env.TOKEN);