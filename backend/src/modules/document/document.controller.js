const tryCatch = require('../../shared/util/tryCatch');
const documentService = require('./document.service');
const AppResponse = require('../../shared/util/AppResponse');
const BadRequestError = require('../../shared/errors/BadRequestError');
const path = require('path');

const createDocument = tryCatch(async (req, res) => {
  if (!req.file) {
    throw new BadRequestError('File is required');
  }
  const { projectId } = req.params;
  const document = await documentService.save(projectId, req.file);

  res.status(201).json(new AppResponse(201, document));
});

const deleteDocument = tryCatch(async (req, res) => {
  const { projectId, documentId } = req.params;
  await documentService.remove(documentId, projectId);

  res.status(200).json(new AppResponse(200));
});

const getDocument = tryCatch(async (req, res) => {
  const { projectId, documentId } = req.params;

  const { url, name } = await documentService.findById(documentId, projectId);

  res.type('pdf');
  res.setHeader('Content-Disposition', `inline; filename= ${name}`);
  res.sendFile(url, {
    root: path.join(__dirname, '..', '..', '..'),
  });
});

const getDocuments = tryCatch(async (req, res) => {
  const { projectId } = req.params;

  const documents = await documentService.list(projectId);

  res.status(200).json(new AppResponse(200, documents));
});

module.exports = {
  createDocument,
  deleteDocument,
  getDocument,
  getDocuments,
};
