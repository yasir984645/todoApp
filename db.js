// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // <- use full URL
  ssl: {
    rejectUnauthorized: false, // needed for Render
  },
});

pool.connect()
  .then(() => console.log("Connected to Render PostgreSQL database"))
  .catch(err => console.error("DB connection error:", err));

module.exports = pool;
