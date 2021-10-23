const Discord = require('discord.js')
const Database = require('@replit/database')
const db = new Database()

module.exports = {
    name: "tag",
    alias: ["t"],
    run: async (client, message, args) => {
        const tags = JSON.parse(await db.get('tags'));
        const $ = args.shift().toLowerCase();
        const tagname = args.shift().toLowerCase()
        if ($ == "create") {
          if (tags[tagname]) return message.channel.send(`Tag ${tagname} has already been made!`)
          tags[tagname] = args.join(' ')
          
          await db.set('tags', JSON.stringify(tags))
          
          message.channel.send(`Tag ${tagname} successfully created! Use \`!tag ${tagname}\` to use it.`)
        }
      
        if (tags[$]) {
          message.channel.send(tags[$])
        }
    }
};
