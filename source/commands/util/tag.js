const Discord = require('discord.js')
const tags = require('../../tags.json')
const fs = require('fs')

module.exports = {
    name: "tag",
    alias: ["t"],
    run: (client, message, args) => {
        const mongoose = client.db;
        const $ = args.shift().toLowerCase();
        const tagname = args.shift().toLowerCase()
        if ($ == "create") {
          if (tags[tagname]) return message.channel.send(`Tag ${tagname} has already been made!`)
          tags[tagname] = args.join(' ')
          
          fs.writeFileSync('../../tags.json', JSON.stringify(tags, null, 2))
          
          message.channel.send(`Tag ${tagname} successfully created! Use \`!tag ${tagname}\` to use it.`)
        }
      
        if (tags[$]) {
          message.channel.send(tags[$])
        }
    }
};
