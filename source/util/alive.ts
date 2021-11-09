// alive script for markbot 24/7 with Oak

import { Application } from "https://deno.land/x/oak/mod.ts";

export async function alive() {
	const app = new Application();

	app.use((ctx) => {
		console.log(`markbot pinged!`);
	});

	app.use((ctx) => {
		console.log("returning a response ...");
		ctx.response.body = "thx";
	});

	// ping markbot every 60 seconds
	setInterval(() => fetch("https://denomark.lajbel.repl.co"), 60000);

	await app.listen({ port: 8000 });
};