const queryHandler = require('../../shared/database/queryHandler');

const findOneById = queryHandler(async (db, { id }) => {
  const { rows } = await db.query('SELECT id, username FROM users WHERE id = $1', [id]);

  return rows[0] || null;
});

const findOneByUsername = queryHandler(async (db, { username }) => {
  const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);

  return rows[0] || null;
});

const save = queryHandler(async (db, { username, password }) => {
  const { rows } = await db.query(
    `INSERT INTO users (username, password) 
      VALUES ($1,$2) 
      RETURNING id, username`,
    [username, password],
  );

  return rows[0];
});

const listUsersByPartialUsername = queryHandler(async (db, { username }) => {
  const { rows } = await db.query(`SELECT id, username FROM users WHERE username LIKE $1 LIMIT 3`, [
    `${username}%`,
  ]);

  return rows;
});

module.exports = {
  findOneById,
  findOneByUsername,
  save,
  listUsersByPartialUsername,
};
