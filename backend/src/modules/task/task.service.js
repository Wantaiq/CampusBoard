const taskRepository = require('./task.repository');
const participantService = require('../participant/participant.service');
const NotFoundError = require('../../shared/errors/NotFoundError');
const db = require('../../shared/database/connection');

const save = async (name, description, dueDate, projectId, assigneeId, status = 'To Do') => {
  const result = await taskRepository.save(db, {
    name,
    description,
    dueDate,
    status,
    projectId,
    assigneeId,
  });

  return taskRepository.getById(db, {
    taskId: result.id,
    projectId,
  });
};

const remove = async (taskId, projectId) => {
  const result = await taskRepository.remove(db, {
    taskId,
    projectId,
  });

  if (result.rowCount === 0) {
    throw new NotFoundError('Task');
  }
};

const viewByTaskId = async (taskId, projectId) => {
  const task = await taskRepository.getById(db, {
    taskId,
    projectId,
  });

  if (!task) {
    throw new NotFoundError('Task');
  }

  return task;
};

const listProjectTasks = async (projectId) => {
  return await taskRepository.getAllProjectTasks(db, { projectId });
};

const update = async (
  taskId,
  projectId,
  name,
  description,
  dueDate,
  assigneeId,
  status = 'To Do',
) => {
  const result = await taskRepository.update(db, {
    name,
    description,
    dueDate,
    status,
    assigneeId,
    taskId,
    projectId,
  });

  if (result.rowCount === 0) {
    throw new NotFoundError('Task');
  }

  return taskRepository.getById(db, {
    taskId,
    projectId,
  });
};

const listAssigneeTasks = async (assigneeId) => {
  return taskRepository.listAssigneeTasks(db, {
    assigneeId,
  });
};

module.exports = {
  save,
  remove,
  listProjectTasks,
  viewByTaskId,
  update,
  listAssigneeTasks,
};
