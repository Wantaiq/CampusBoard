const queryHandler = require('../../shared/database/queryHandler');

const save = queryHandler(
  async (db, { name, description, dueDate, status, projectId, assigneeId }) => {
    const [result] = await db.query(
      'INSERT INTO ccl_tasks (name, description, due_date, status, project_id, assignee_id) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, dueDate, status, projectId, assigneeId],
    );

    return result;
  },
);

const remove = queryHandler(async (db, { taskId, projectId }) => {
  const [result] = await db.query(
    'DELETE FROM ccl_tasks WHERE id = ? AND project_id = ?',
    [taskId, projectId],
  );

  return result;
});

const getById = queryHandler(async (db, { taskId, projectId }) => {
  const [rows] = await db.query(
    `SELECT t.id, t.project_id, t.name, t.description, t.due_date as deadline, t.status,u.id as assignee_id, u.username as assignee
    FROM ccl_tasks t
    JOIN ccl_users u ON u.id = t.assignee_id
    WHERE t.id = ? AND t.project_id = ?`,
    [taskId, projectId],
  );

  return rows[0] || null;
});

const getAllProjectTasks = queryHandler(async (db, { projectId }) => {
  const [rows] = await db.query(
    `SELECT t.id, t.project_id, t.name, t.description, t.due_date as deadline, t.status, u.id as assignee_id, u.username as assignee
    FROM ccl_tasks t
    JOIN ccl_users u ON u.id = t.assignee_id
    WHERE project_id = ?`,
    [projectId],
  );

  return rows;
});

const update = queryHandler(
  async (
    db,
    { name, description, dueDate, status, assigneeId, taskId, projectId },
  ) => {
    const [result] = await db.query(
      'UPDATE ccl_tasks SET name = ?, description = ?, due_date = ?, status = ?, assignee_id = ? WHERE id = ? AND project_id = ?',
      [name, description, dueDate, status, assigneeId, taskId, projectId],
    );

    return result;
  },
);

const listAssigneeTasks = queryHandler(async (db, { assigneeId }) => {
  const [result] = await db.query(
    `SELECT t.*
      FROM ccl_tasks t
    JOIN ccl_projects p
      ON t.project_id = p.id
    JOIN ccl_project_participants pp
      ON pp.project_id = p.id
    WHERE pp.user_id = ?
      AND pp.role IN ('owner', 'member')
      AND t.assignee_id = ?`,
    [assigneeId, assigneeId],
  );

  return result;
});

module.exports = {
  save,
  remove,
  getById,
  getAllProjectTasks,
  update,
  listAssigneeTasks,
};
