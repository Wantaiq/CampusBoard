const AppResponse = require('../../shared/util/AppResponse');
const tryCatch = require('../../shared/util/tryCatch');
const taskService = require('./task.service');

const createTask = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const { name, description, dueDate, status, assigneeId } = req.body;

  const task = await taskService.save(name, description, dueDate, projectId, assigneeId, status);

  res.status(201).json(new AppResponse(201, task));
});

const deleteTask = tryCatch(async (req, res) => {
  const { taskId, projectId } = req.params;

  await taskService.remove(taskId, projectId);

  res.status(200).json(new AppResponse(200));
});

const getProjectTasks = tryCatch(async (req, res) => {
  const { projectId } = req.params;

  const tasks = await taskService.listProjectTasks(projectId);

  res.status(200).json(new AppResponse(200, tasks));
});

const getTask = tryCatch(async (req, res) => {
  const { projectId, taskId } = req.params;

  const task = await taskService.viewByTaskId(taskId, projectId);

  res.status(200).json(new AppResponse(200, task));
});

const updateTask = tryCatch(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { name, description, dueDate, status, assigneeId } = req.body;

  const task = await taskService.update(
    taskId,
    projectId,
    name,
    description,
    dueDate,
    assigneeId,
    status,
  );

  res.status(200).json(new AppResponse(200, task));
});

module.exports = {
  createTask,
  deleteTask,
  getProjectTasks,
  getTask,
  updateTask,
};
