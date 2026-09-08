const tryCatch = require('../../shared/util/tryCatch');
const AppResponse = require('../../shared/util/AppResponse');
const projectService = require('./project.service');

const createProject = tryCatch(async (req, res) => {
  const { id } = req.user;
  const project = await projectService.save(req.body.name, req.body.description, id);

  res.status(201).json(new AppResponse(201, project));
});

const deleteProject = tryCatch(async (req, res) => {
  const { projectId } = req.params;

  await projectService.remove(projectId);
  res.status(200).json(new AppResponse(200));
});

const getProject = tryCatch(async (req, res) => {
  const project = await projectService.viewProject(req.user.id, req.params.projectId);

  res.status(200).json(new AppResponse(200, project));
});

module.exports = {
  createProject,
  deleteProject,
  getProject,
};
