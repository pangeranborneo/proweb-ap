const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce-kecil',
  password: 'codetohero000',
  port: 5432,
});

module.exports = pool;