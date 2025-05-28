// db.js
import sqlite3 from "sqlite3";
sqlite3.verbose();

const DB_FILE = "./rail_logistics.db";
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Could not connect to SQLite:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// auto-create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS trains (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      train_number TEXT    UNIQUE,
      model         TEXT,
      capacity      INTEGER
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS shipments (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      train_id       INTEGER,
      origin         TEXT,
      destination    TEXT,
      departure_date TEXT,
      arrival_date   TEXT,
      FOREIGN KEY(train_id) REFERENCES trains(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS cargo_items (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      shipment_id INTEGER,
      description TEXT,
      weight      REAL,
      quantity    INTEGER,
      FOREIGN KEY(shipment_id) REFERENCES shipments(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS repair_history (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      train_id       INTEGER,
      repair_date    TEXT,
      description    TEXT,
      cost           REAL,
      downtime_hours REAL,
      FOREIGN KEY(train_id) REFERENCES trains(id)
    )
  `);
});

export default db;
