import { Client } from "pg";

const pgClient = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_xoLhCbnf24FU@ep-late-union-ahbwqvj6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

async function main() {
  try {
    await pgClient.connect();

    const response = await pgClient.query("");
    console.log(response.rows);
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    await pgClient.end();
  }
}

main();
