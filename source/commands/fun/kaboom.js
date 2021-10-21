module.exports = {
    name: "kaboom",
    alias: ["k"],
    run: (client, message, args) => {
        const funnyKaboom = [
            "https://imgur.com/EFhRwqF.gif", 
            "https://imgur.com/dZyIaSR.gif",
            "https://imgur.com/aYobVCy.gif",
            "https://imgur.com/BI875Rq.gif"
        ];

        return message.channel.send(funnyKaboom[Math.floor(Math.random() * funnyKaboom.length)]);
    }
};