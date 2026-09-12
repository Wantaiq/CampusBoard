const queryHandler = require('../../shared/database/queryHandler');

const add = queryHandler(async (db, { userId, projectId, role = 'member' }) => {
  const result = await db.query(
    `INSERT INTO project_participants (user_id, project_id, role)
    VALUES ($1, $2, $3)`,
    [userId, projectId, role],
  );

  return result;
});

const remove = queryHandler(async (db, { userId, projectId }) => {
  const result = await db.query(
    `DELETE FROM project_participants
    WHERE user_id = $1
    AND project_id = $2`,
    [userId, projectId],
  );

  return result;
});

const updateRole = queryHandler(async (db, { userId, projectId, role = 'member' }) => {
  const result = await db.query(
    `UPDATE project_participants
      SET role = $1
      WHERE user_id = $2
      AND project_id = $3`,
    [role, userId, projectId],
  );

  return result;
});

const getById = queryHandler(async (db, { userId, projectId }) => {
  const { rows } = await db.query(
    `SELECT pp.user_id, pp.role, pp.project_id, u.username
    FROM project_participants pp
    JOIN users u
    ON pp.user_id = u.id
    WHERE pp.user_id = $1
    AND pp.project_id = $2`,
    [userId, projectId],
  );

  return rows[0] || null;
});

const getAll = queryHandler(async (db, { projectId }) => {
  const { rows } = await db.query(
    `SELECT pp.user_id, pp.role, pp.project_id, u.username
    FROM project_participants pp
    JOIN users u
    ON pp.user_id = u.id
    WHERE pp.project_id = $1`,
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
