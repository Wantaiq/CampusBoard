const queryHandler = require('../../shared/database/queryHandler');

const findOneById = queryHandler(async (db, { id }) => {
  const [rows] = await db.query(
    'SELECT id, username FROM ccl_users WHERE id = ?',
    [id],
  );

  return rows[0] || null;
});

const findOneByUsername = queryHandler(async (db, { username }) => {
  const [rows] = await db.query('SELECT * FROM ccl_users WHERE username = ?', [
    username,
  ]);

  return rows[0] || null;
});

const save = queryHandler(async (db, { username, password }) => {
  const [result] = await db.query(
    'INSERT INTO ccl_users (username, password) VALUES (?,?)',
    [username, password],
  );

  return result;
});

const listUsersByPartialUsername = queryHandler(async (db, { username }) => {
  const [result] = await db.query(
    `SELECT id, username FROM ccl_users WHERE username LIKE ? LIMIT 3`,
    [`${username}%`],
  );

  return result;
});

module.exports = {
  findOneById,
  findOneByUsername,
  save,
  listUsersByPartialUsername,
};
