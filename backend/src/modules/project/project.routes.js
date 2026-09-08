const express = require('express');
const projectController = require('./project.controller');
const authenticate = require('../../middleware/authenticate');
const participantRoutes = require('../participant/participant.routes');
const taskRoutes = require('../task/task.routes');
const documentRoutes = require('../document/document.routes');
const authorizeProjectPermission = require('../../middleware/authorize');
const validation = require('../../middleware/validation');
const projectSchema = require('./project.schema');

const router = express.Router();

router.use(authenticate);
router.post('/', validation(projectSchema.createProject), projectController.createProject);

router
  .route('/:projectId')
  .all(validation(null, projectSchema.projectParam))
  .get(authorizeProjectPermission(['owner', 'member']), projectController.getProject)
  .delete(authorizeProjectPermission(['owner']), projectController.deleteProject);

router.use('/:projectId/participants', participantRoutes);
router.use('/:projectId/tasks', taskRoutes);
router.use('/:projectId/documents', documentRoutes);

module.exports = router;
