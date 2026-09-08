const queryHandler = require('../../shared/database/queryHandler');

const add = queryHandler(async (db, { userId, projectId, role = 'member' }) => {
  const [result] = await db.query(
    `INSERT INTO ccl_project_participants (user_id, project_id, role)
    VALUES (?, ?, ?)`,
    [userId, projectId, role],
  );

  return result;
});

const remove = queryHandler(async (db, { userId, projectId }) => {
  const [result] = await db.query(
    `DELETE FROM ccl_project_participants
    WHERE user_id = ?
    AND project_id = ?`,
    [userId, projectId],
  );

  return result;
});

const updateRole = queryHandler(async (db, { userId, projectId, role = 'member' }) => {
  const [result] = await db.query(
    `UPDATE ccl_project_participants
      SET role = ?
      WHERE user_id = ?
      AND project_id = ?`,
    [role, userId, projectId],
  );

  return result;
});

const getById = queryHandler(async (db, { userId, projectId }) => {
  const [rows] = await db.query(
    `SELECT pp.user_id, pp.role, pp.project_id, u.username
    FROM ccl_project_participants pp
    JOIN ccl_users u
    ON pp.user_id = u.id
    WHERE pp.user_id = ?
    AND pp.project_id = ?`,
    [userId, projectId],
  );

  return rows[0] || null;
});

const getAll = queryHandler(async (db, { projectId }) => {
  const [rows] = await db.query(
    `SELECT pp.user_id, pp.role, pp.project_id, u.username
    FROM ccl_project_participants pp
    JOIN ccl_users u
    ON pp.user_id = u.id
    WHERE pp.project_id = ?`,
    [projectId],
  );

  return rows;
});

module.exports = {
  add,
  remove,
  updateRole,
  getAll,
  getById,
};
