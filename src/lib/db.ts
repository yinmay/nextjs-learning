import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Lazy initialization to allow environment variables to be loaded first
let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!db) {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL environment variable is not set');
    }
    const client = postgres(process.env.DB_URL);
    db = drizzle(client);
  }
  return db;
}

export { getDb as db };
