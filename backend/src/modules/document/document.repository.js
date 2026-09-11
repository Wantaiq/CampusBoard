const queryHandler = require('../../shared/database/queryHandler');

const save = queryHandler(async (db, { projectId, documentName, documentPath }) => {
  const { rows } = await db.query(
    `INSERT INTO documents (project_id, name, url)
    VALUES ($1, $2, $3)
    RETURNING id, name, project_id`,
    [projectId, documentName, documentPath],
  );

  return rows[0];
});

const remove = queryHandler(async (db, { documentId, projectId }) => {
  const result = await db.query(
    `DELETE FROM documents
    WHERE id = $1 AND project_id = $2`,
    [documentId, projectId],
  );

  return result;
});

const findById = queryHandler(async (db, { documentId, projectId }) => {
  const { rows } = await db.query(
    `SELECT url, project_id, name, id FROM documents
    WHERE id = $1 AND project_id = $2`,
    [documentId, projectId],
  );

  return rows[0] || null;
});

const findByName = queryHandler(async (db, { documentName, projectId }) => {
  const { rows } = await db.query(
    `SELECT url, name FROM documents
    WHERE name = $1 AND project_id = $2`,
    [documentName, projectId],
  );

  return rows[0] || null;
});

const list = queryHandler(async (db, { projectId }) => {
  const { rows } = await db.query(
    `
    SELECT id, name, project_id FROM documents WHERE project_id = $1`,
    [projectId],
  );

  return rows;
});

module.exports = {
  save,
  remove,
  findById,
  list,
  findByName,
};
