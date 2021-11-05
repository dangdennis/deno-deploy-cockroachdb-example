import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

interface EnvVars {
	DB_USER: string;
	DB_DATABASE: string;
	DB_HOST: string;
	DB_PORT: string;
	DB_PW: string;
}

const env = config({ safe: true })

const client = new Client({
	user: Deno.env.get("DB_USER") ?? env.DB_USER,
	database: Deno.env.get("DB_DATABASE") ?? env.DB_DATABASE,
	hostname: Deno.env.get("DB_HOST") ?? env.DB_HOST,
	port: Deno.env.get("DB_PORT") ?? env.DB_PORT,
	password: Deno.env.get("DB_PW") ?? env.DB_PW,
});

await client.connect();

async function handler(req: Request): Promise<Response> {
	const result = await client.queryArray("select * from users;");
	console.log(result.rows);
	return new Response(JSON.stringify(result.rows));
}

console.log("Listening on http://localhost:8000");
await listenAndServe(":8000", handler);
