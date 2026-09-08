const JoiBase = require('../../shared/util/JoiBase');
const userSchema = require('../user/user.schema');

const createTask = JoiBase.object({
  name: JoiBase.string().trim().min(3).required().label('Task name'),
  description: JoiBase.string()
    .trim()
    .min(3)
    .required()
    .label('Task description'),
  assigneeId: JoiBase.number()
    .integer()
    .positive()
    .required()
    .label('Assignee is required'),
  status: JoiBase.string()
    .trim()
    .valid('To Do', 'In Progress', 'Done')
    .label('Status'),
  dueDate: JoiBase.date().iso().required().label('Due date'),
});

const taskParam = JoiBase.object({
  taskId: JoiBase.number().integer().positive().required().label('Task ID'),
});

module.exports = { createTask, taskParam };
