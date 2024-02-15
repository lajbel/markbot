import "dotenv/load";
import { Database, PostgresConnector } from "denodb";
import Example from "./models/Example.ts";

const connector = new PostgresConnector({
    database: Deno.env.get("PGDATABASE") ?? "",
    host: Deno.env.get("PGHOST") ?? "",
    username: Deno.env.get("PGUSER") ?? "",
    password: Deno.env.get("PGPASSWORD") ?? "",
    port: parseInt(Deno.env.get("PGPORT") ?? "5432"),
});

const db = new Database(connector);
db.link([Example]);

export default db;
