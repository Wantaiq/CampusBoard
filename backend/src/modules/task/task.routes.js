const express = require('express');
const taskController = require('./task.controller');
const authorizeProjectPermission = require('../../middleware/authorize');
const projectSchema = require('../project/project.schema');
const validation = require('../../middleware/validation');
const taskSchema = require('./task.schema');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .all(
    validation(null, projectSchema.projectParam),
    authorizeProjectPermission(['member', 'owner']),
  )
  .get(taskController.getProjectTasks)
  .post(validation(taskSchema.createTask), taskController.createTask);

router
  .route('/:taskId')
  .all(
    validation(null, projectSchema.projectParam.concat(taskSchema.taskParam)),
    authorizeProjectPermission(['member', 'owner']),
  )
  .get(taskController.getTask)
  .delete(taskController.deleteTask)
  .put(validation(taskSchema.createTask), taskController.updateTask);

module.exports = router;
