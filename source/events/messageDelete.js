module.exports = (client, message) => {    
    const logs = client.guilds.cache.get("").channels.cache.get("819593108982988869");

    logs.send("Message Deleted: " + message.content + "\n" + "by: " + message.author.tag);
};
