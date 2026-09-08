const InternalError = require('../../shared/errors/InternalError');
const ForbiddenError = require('../../shared/errors/ForbiddenError');
const NotFoundError = require('../../shared/errors/NotFoundError');
const projectRepository = require('./project.repository');
const taskService = require('../task/task.service');
const participantService = require('../participant/participant.service');
const participantRepository = require('../participant/participant.repository');
const db = require('../../shared/database/connection');

const save = async (name, description, createdById) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const result = await projectRepository.save(connection, {
      name,
      description,
      createdById,
    });

    await participantRepository.add(connection, {
      userId: createdById,
      projectId: result.insertId,
      role: 'owner',
    });

    const createdProject = await projectRepository.viewProject(connection, {
      projectId: result.insertId,
      userId: createdById,
    });

    await connection.commit();

    return createdProject;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const remove = async (projectId) => {
  const result = await projectRepository.remove(db, { projectId });

  if (result.affectedRows === 0) {
    throw new InternalError('Project could not be deleted');
  }

  return;
};

const viewProject = async (userId, projectId) => {
  const project = await projectRepository.viewProject(db, {
    projectId,
    userId,
  });

  if (!project) {
    throw new NotFoundError('Project');
  }

  return project;
};

const listUserProjects = async (userId) => {
  return await projectRepository.listUserProjects(db, { userId });
};

const authorizeProjectPermission = async (userId, projectId, requiredRoles) => {
  const participant = await participantRepository.getById(db, {
    userId,
    projectId,
  });

  if (!participant) {
    throw new ForbiddenError();
  }

  if (!requiredRoles.includes(participant.role)) {
    throw new ForbiddenError();
  }

  return participant;
};

module.exports = {
  save,
  remove,
  viewProject,
  authorizeProjectPermission,
  listUserProjects,
};
