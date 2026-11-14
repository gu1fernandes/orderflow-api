
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export function createDatabase(
  filename = process.env.DATABASE_PATH ?? "./data/orderflow.db"
) {
  if (filename !== ":memory:") {
    mkdirSync(dirname(filename), { recursive: true });
  }

  const database = new Database(filename);

  database.pragma("journal_mode = WAL");

  database.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer TEXT NOT NULL,
      customer_type TEXT NOT NULL,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      total REAL NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  return database;
}
