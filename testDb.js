// testDb.js

import pool from './config/db.js';

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully at:', result.rows[0].now);
    process.exit(0); // exit cleanly
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // exit with error
  }
}
console.log(typeof process.env.DB_Password); // should be 'string'


testConnection();
