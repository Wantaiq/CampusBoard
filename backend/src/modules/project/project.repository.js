const queryHandler = require('../../shared/database/queryHandler');

const save = queryHandler(async (db, { name, description, createdById }) => {
  const { rows } = await db.query(
    `INSERT INTO projects (name, description, created_by) 
      VALUES ($1,$2,$3) 
    RETURNING id, name, description`,
    [name, description, createdById],
  );

  return rows[0];
});

const remove = queryHandler(async (db, { projectId }) => {
  const result = await db.query('DELETE FROM projects WHERE id = $1', [projectId]);

  return result;
});

const listUserProjects = queryHandler(async (db, { userId }) => {
  const { rows } = await db.query(
    `SELECT p.id, p.name, p.description, pp.role FROM projects p
    JOIN project_participants pp
      ON pp.project_id = p.id
    WHERE pp.user_id = $1
    AND pp.role IN ('owner', 'member')`,
    [userId],
  );

  return rows;
});

const viewProject = queryHandler(async (db, { projectId, userId }) => {
  const { rows } = await db.query(
    `
    SELECT p.id, p.name, p.description, pp.role FROM projects p
    JOIN project_participants pp
      ON pp.project_id = p.id
    WHERE p.id = $1
      AND pp.user_id = $2
      AND pp.role IN ('owner', 'member')
    `,
    [projectId, userId],
  );

  return rows[0] || null;
});

module.exports = {
  save,
  remove,
  listUserProjects,
  viewProject,
};
