const queryHandler = require('../../shared/database/queryHandler');

const save = queryHandler(
  async (db, { name, description, dueDate, status, projectId, assigneeId }) => {
    const { rows } = await db.query(
      `INSERT INTO tasks (name, description, due_date, status, project_id, assignee_id) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`,
      [name, description, dueDate, status, projectId, assigneeId],
    );

    return rows[0];
  },
);

const remove = queryHandler(async (db, { taskId, projectId }) => {
  const result = await db.query('DELETE FROM tasks WHERE id = $1 AND project_id = $2', [
    taskId,
    projectId,
  ]);

  return result;
});

const getById = queryHandler(async (db, { taskId, projectId }) => {
  const { rows } = await db.query(
    `SELECT t.id, t.project_id, t.name, t.description, t.due_date as deadline, t.status,u.id as assignee_id, u.username as assignee
    FROM tasks t
    JOIN users u ON u.id = t.assignee_id
    WHERE t.id = $1 AND t.project_id = $2`,
    [taskId, projectId],
  );

  return rows[0] || null;
});

const getAllProjectTasks = queryHandler(async (db, { projectId }) => {
  const { rows } = await db.query(
    `SELECT t.id, t.project_id, t.name, t.description, t.due_date as deadline, t.status, u.id as assignee_id, u.username as assignee
    FROM tasks t
    JOIN users u ON u.id = t.assignee_id
    WHERE project_id = $1`,
    [projectId],
  );

  return rows;
});

const update = queryHandler(
  async (db, { name, description, dueDate, status, assigneeId, taskId, projectId }) => {
    const result = await db.query(
      'UPDATE tasks SET name = $1, description = $2, due_date = $3, status = $4, assignee_id = $5 WHERE id = $6 AND project_id = $7',
      [name, description, dueDate, status, assigneeId, taskId, projectId],
    );

    return result;
  },
);

const listAssigneeTasks = queryHandler(async (db, { assigneeId }) => {
  const { rows } = await db.query(
    `SELECT t.*
      FROM tasks t
    JOIN projects p
      ON t.project_id = p.id
    JOIN project_participants pp
      ON pp.project_id = p.id
    WHERE pp.user_id = $1
      AND pp.role IN ('owner', 'member')
      AND t.assignee_id = $2`,
    [assigneeId, assigneeId],
  );

  return rows;
});

module.exports = {
  save,
  remove,
  getById,
  getAllProjectTasks,
  update,
  listAssigneeTasks,
};
