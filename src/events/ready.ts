import { ClientPresence } from "@harmony/harmony";
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
        "KAPLAY",
        "KAPLAY Server",
        "KAPLAYGROUND",
        "Family Friendly Words",
        "kaplayjs.com",
        "Fireworks in kaboom.com",
        "twitter.com/kaboomjs",
        "Mark (?)",
        "New Kaboom games on Itch.io",
        "New Kaboom games on replit.com/community/kaboom",
        "New Kaboom games on newgrounds.com",
        "Kajam 2023",
    ];

    function editFunnyStatus() {
        // client.setPresence({
        //     name: funnyStatus[Math.floor(Math.random() * funnyStatus.length)],
        //     type: "WATCHING",
        //     status: "online",
        // });

        client.setPresence(
            new ClientPresence({
                activity: {
                    name:
                        funnyStatus[
                            Math.floor(Math.random() * funnyStatus.length)
                        ],
                    type: "WATCHING",
                    url: "https://kaplayjs.com",
                },
            }),
        );
    }

    setInterval(() => {
        editFunnyStatus();
    }, 60000);

    editFunnyStatus();
});
