export function commandHandler(message) {
  	const prefix = ".";

	if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    };
};