const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "random",
    alias: ["dice", "r"],
    run: (client, message, args) => {
        let fromNumber = 1, toNumber = 6;
        if(args[0]) args[0] = parseInt(args[0]);
        if(args[1]) args[1] = parseInt(args[1]);
        if(args[0]>args[1]){
          let aux = args[0];
          args[0] = args[1]; args[1] = aux;
        }
        if(args[1]){
           if(!args[0]) return message.channel.send(new MessageEmbed().setColor("ff0000").setTitle("Invalid number").setDescription("The first argument must be a valid number (will be rounded to integer)"));
           fromNumber = args[0];
           toNumber = args[1];
        }
        else if(args[0]) toNumber = args[0];
        let randomNumber = Math.ceil(Math.random()*(toNumber-fromNumber+1));
      
        message.channel.send(new MessageEmbed()
        .setColor("0xffe359")
        .setTitle(`Generating a random number from ${fromNumber} to ${toNumber}...`)
        .setDescription(`The generated number is ${randomNumber}!`));
    }
};
