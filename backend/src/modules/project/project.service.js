const InternalError = require('../../shared/errors/InternalError');
const ForbiddenError = require('../../shared/errors/ForbiddenError');
const NotFoundError = require('../../shared/errors/NotFoundError');
const projectRepository = require('./project.repository');
const participantRepository = require('../participant/participant.repository');
const db = require('../../shared/database/connection');

const save = async (name, description, createdById) => {
  const connection = await db.connect();
  try {
    await connection.query('BEGIN');
    const result = await projectRepository.save(connection, {
      name,
      description,
      createdById,
    });

    await participantRepository.add(connection, {
      userId: createdById,
      projectId: result.id,
      role: 'owner',
    });

    await connection.query('COMMIT');

    return projectRepository.viewProject(db, { projectId: result.id, userId: createdById });
  } catch (error) {
    await connection.query('ROLLBACK');
    throw error;
  } finally {
    connection.release();
  }
};

const remove = async (projectId) => {
  const result = await projectRepository.remove(db, { projectId });

  if (result.rowCount === 0) {
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
