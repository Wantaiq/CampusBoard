const tryCatch = require('../../shared/util/tryCatch');
const AppResponse = require('../../shared/util/AppResponse');
const projectService = require('../project/project.service');
const taskService = require('../task/task.service');

const getMe = tryCatch(async (req, res) => {
  res.status(200).json(new AppResponse(200, req.user));
});

const getMyProjects = tryCatch(async (req, res) => {
  const { id: userId } = req.user;
  const userProjects = await projectService.listUserProjects(userId);

  res.status(200).json(new AppResponse(200, userProjects));
});

const getMyTasks = tryCatch(async (req, res) => {
  const { id: userId } = req.user;
  const userTasks = await taskService.listAssigneeTasks(userId);

  res.status(200).json(new AppResponse(200, userTasks));
});

module.exports = {
  getMe,
  getMyProjects,
  getMyTasks,
};
