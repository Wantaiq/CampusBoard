const env = require('../../config/env');
const { Pool } = require('pg');

const db = new Pool({
  host: env.database.host,
  port: env.database.port,
  user: env.database.user,
  password: env.database.password,
  database: env.database.database,
});

module.exports = db;
