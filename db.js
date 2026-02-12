const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // your PostgreSQL username
  host: 'localhost',
  database: 'tasks',    // your database name
  password: 'Yasir@postgresql#1',// your PostgreSQL password
  port: 5432
});


module.exports = pool;
