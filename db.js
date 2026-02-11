const sqlite3 = require('sqlite3');

const db = new sqlite3.Database("./tasksList.db" );

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL
  )
`)

module.exports = db;

// const sqlite3 = require("sqlite3").verbose();


// const db = new sqlite3.Database("./tasks.db", err => {
//   if (err) console.error(err.message);
//   else console.log("Connected to SQLite database");
// });

// // Create table if not exists
// db.run(`
//   CREATE TABLE IF NOT EXISTS tasks (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     task TEXT NOT NULL
//   )
// `);

// module.exports = db;
