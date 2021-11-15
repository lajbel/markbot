// alive script for markbot 24/7 with Oak

import {Application} from "https://deno.land/x/oak/mod.ts";

export async function alive() {
	const app = new Application();

	app.use((ctx) => {
		console.log(`markbot pinged!`);
		ctx.response.body = "thx";
	});

	// ping markbot every 60 seconds
	setInterval(() => fetch(`https://${Deno.env.get("REPL_ID")}.id.repl.co`), 2000);

	await app.listen({port: 8000});
}
