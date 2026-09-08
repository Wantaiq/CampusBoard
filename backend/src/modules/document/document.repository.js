const queryHandler = require('../../shared/database/queryHandler');

const save = queryHandler(async (db, { projectId, documentName, documentPath }) => {
  const [result] = await db.query(
    `INSERT INTO ccl_documents (project_id, name, url)
    VALUES (?, ?, ?)`,
    [projectId, documentName, documentPath],
  );

  return result;
});

const remove = queryHandler(async (db, { documentId, projectId }) => {
  const [result] = await db.query(
    `DELETE FROM ccl_documents
    WHERE id = ? AND project_id = ?`,
    [documentId, projectId],
  );

  return result;
});

const findById = queryHandler(async (db, { documentId, projectId }) => {
  const [rows] = await db.query(
    `SELECT url, project_id, name, id FROM ccl_documents
    WHERE id = ? AND project_id = ?`,
    [documentId, projectId],
  );

  return rows[0] || null;
});

const findByName = queryHandler(async (db, { documentName, projectId }) => {
  const [rows] = await db.query(
    `SELECT url, name FROM ccl_documents
    WHERE name = ? AND project_id = ?`,
    [documentName, projectId],
  );

  return rows[0] || null;
});

const list = queryHandler(async (db, { projectId }) => {
  const [rows] = await db.query(
    `
    SELECT id, name, project_id FROM ccl_documents WHERE project_id = ?`,
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
