# Deno Deploy with CockroachDB Serverless

1. [download deno](https://deno.land/#installation)
2. [create a cockroachdb serverless cluster](https://www.cockroachlabs.com/)
3. `touch .env.`
4. copy `.env.example` into `.env.` and fill with your db credentials
5. `deno run --allow-env --allow-net --allow-read --unstable --watch ./main.tsx`