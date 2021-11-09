import { Application } from "https://deno.land/x/oak/mod.ts";

export async function alive() {
  const port = 8000;
  const app = new Application();

  app.use((ctx) => {
    console.log(`markbot pinged!`);
  });

  app.use((ctx) => {
    console.log("returning a response ...");
    ctx.response.body = "thx";
  });

  setInterval(() => {
    fetch("https://denomark.lajbel.repl.co");
  }, 60000);

  await app.listen({ port: port });
}
