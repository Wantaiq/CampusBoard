const queryHandler = require('../../shared/database/queryHandler');

const save = queryHandler(async (db, { name, description, createdById }) => {
  const [result] = await db.query(
    'INSERT INTO ccl_projects (name, description, created_by) VALUES (?,?, ?)',
    [name, description, createdById],
  );

  return result;
});

const remove = queryHandler(async (db, { projectId }) => {
  const [result] = await db.query('DELETE FROM ccl_projects WHERE id = ?', [projectId]);

  return result;
});

const listUserProjects = queryHandler(async (db, { userId }) => {
  const [rows] = await db.query(
    `SELECT p.id, p.name, p.description, pp.role FROM ccl_projects p
    JOIN ccl_project_participants pp
      ON pp.project_id = p.id
    WHERE pp.user_id = ?
    AND pp.role IN ('owner', 'member')`,
    [userId],
  );

  return rows;
});

const viewProject = queryHandler(async (db, { projectId, userId }) => {
  const [rows] = await db.query(
    `
    SELECT p.id, p.name, p.description, pp.role FROM ccl_projects p
    JOIN ccl_project_participants pp
      ON pp.project_id = p.id
    WHERE p.id = ?
      AND pp.user_id = ?
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
