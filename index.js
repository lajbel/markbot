// Require Modules

const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();

for(const dir of readdirSync(__dirname + "/commands")) {
    for(const file of readdirSync(__dirname + "/commands/" + dir)) {
        if(file.endsWith(".js")) {
            const content = require(__dirname + `/commands/${dir}/${file}`);
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

for(const file of readdirSync(__dirname + "/events")) {
    if(file.endsWith(".js")) {
        const content = require(__dirname + `/events/${file}`)
        const key = file.substring(0, file.length - 3);

        client.on(key, content.bind(null, client));
    };
};

client.login(process.env.TOKEN);