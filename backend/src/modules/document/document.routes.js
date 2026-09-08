const express = require('express');
const authorizeProjectPermission = require('../../middleware/authorize');
const documentController = require('./document.controller');
const upload = require('../../middleware/upload');
const validation = require('../../middleware/validation');
const documentSchema = require('./document.schema');
const projectSchema = require('../project/project.schema');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .all(
    validation(null, projectSchema.projectParam),
    authorizeProjectPermission(['owner', 'member']),
  )
  .post(upload.single('document'), documentController.createDocument)
  .get(documentController.getDocuments);

router
  .route('/:documentId')
  .all(
    validation(null, documentSchema.documentParams),
    authorizeProjectPermission(['owner', 'member']),
  )
  .get(documentController.getDocument)
  .delete(documentController.deleteDocument);

module.exports = router;
