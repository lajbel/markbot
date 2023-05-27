import { client } from "../client.ts";
import { important } from "../util/logger.ts";

export default client.on("ready", () => {
    important(`markbot is online in ${client.user?.tag}!`);

    console.log(`	                                           
_____ _____ _____ _____ _____ _____ _____ 
|     |  _  | __  |  |  | __  |     |_   _|
| | | |     |    -|    -| __ -|  |  | | |  
|_|_|_|__|__|__|__|__|__|_____|_____| |_|  
												

MarkBot © Licensed by Bean Tecnologies & Co.
    `);

    const funnyStatus = [
        "Kaboom.js",
        "Kaboom Server",
        "Kaboom Playground",
        "Family Friendly Words",
        "Powerful",
        "kaboomjs.com",
        "Fireworks in kaboom.com",
        "twitter.com/kaboomjs",
        "Mark (?)",
        "New Kaboom games on Itch.io",
        "Kajam 2023",
        "New Kaboom games on replit.com/community/kaboom",
    ];

    function editFunnyStatus() {
        client.setPresence({
            name: funnyStatus[Math.floor(Math.random() * funnyStatus.length)],
            type: "WATCHING",
            status: "online",
        });
    }

    setInterval(() => {
        editFunnyStatus();
    }, 60000);

    editFunnyStatus();
});
