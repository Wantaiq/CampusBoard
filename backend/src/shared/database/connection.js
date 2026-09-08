const env = require('../../config/env');
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: env.database.host,
  port: env.database.port,
  user: env.database.user,
  password: env.database.password,
  database: env.database.database,
});

module.exports = db;
