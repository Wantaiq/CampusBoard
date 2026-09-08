const JoiBase = require('../../shared/util/JoiBase');

const createProject = JoiBase.object({
  name: JoiBase.string().trim().min(3).required().label('Project name'),
  description: JoiBase.string()
    .trim()
    .min(3)
    .required()
    .label('Project description'),
});

const projectParam = JoiBase.object({
  projectId: JoiBase.number()
    .integer()
    .positive()
    .required()
    .label('Project ID'),
});

module.exports = { createProject, projectParam };
