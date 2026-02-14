const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => console.log("Connected to Supabase PostgreSQL database"))
  .catch(err => console.error("DB connection error:", err));

module.exports = pool;
