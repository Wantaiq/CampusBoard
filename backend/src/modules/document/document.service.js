const fs = require('node:fs/promises');
const InternalError = require('../../shared/errors/InternalError');
const NotFoundError = require('../../shared/errors/NotFoundError');
const ConflictError = require('../../shared/errors/ConflictError');
const documentRepository = require('./document.repository');
const db = require('../../shared/database/connection');

const save = async (projectId, file) => {
  const documentPath = file.path;
  const documentName = file.originalname;

  try {
    const existingDocument = await documentRepository.findByName(db, {
      documentName,
      projectId,
    });

    if (existingDocument) {
      throw new ConflictError('File', `${documentName} is already in the project`);
    }

    const result = await documentRepository.save(db, {
      projectId,
      documentName,
      documentPath,
    });

    if (result.affectRows === 0) {
      throw new InternalError('Could not save document');
    }

    const { url, ...rest } = await documentRepository.findById(db, {
      documentId: result.insertId,
      projectId,
    });

    return rest;
  } catch (error) {
    await fs.unlink(documentPath);
    throw error;
  }
};

const remove = async (documentId, projectId) => {
  const file = await documentRepository.findById(db, {
    documentId,
    projectId,
  });

  if (!file) {
    throw new NotFoundError('Document');
  }

  const result = await documentRepository.remove(db, {
    documentId,
    projectId,
  });

  if (result.affectedRows === 0) {
    throw new NotFoundError('Document');
  }

  await fs.unlink(file.url);
};

const findById = async (documentId, projectId) => {
  const document = await documentRepository.findById(db, {
    documentId,
    projectId,
  });

  if (!document) {
    throw new NotFoundError('File');
  }

  return document;
};

const list = async (projectId) => {
  return documentRepository.list(db, {
    projectId,
  });
};

module.exports = { save, remove, findById, list };
