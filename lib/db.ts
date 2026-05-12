import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Define the database file path
const dbPath = path.join(process.cwd(), 'game-data.db');

let dbInstance: Database | null = null;

export async function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Initialize the schema
  await initDb(dbInstance);

  return dbInstance;
}

async function initDb(db: Database) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      class_name TEXT NOT NULL,
      avatar TEXT,
      status TEXT DEFAULT 'game_over',
      score INTEGER DEFAULT 0,
      played_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrasi jika kolom avatar atau status belum ada
  try {
    await db.exec('ALTER TABLE students ADD COLUMN avatar TEXT');
  } catch (e) {}

  try {
    await db.exec('ALTER TABLE students ADD COLUMN status TEXT DEFAULT "game_over"');
  } catch (e) {}
}
