const participantRepository = require('./participant.repository');
const NotFoundError = require('../../shared/errors/NotFoundError');
const InternalError = require('../../shared/errors/InternalError');
const BadRequestError = require('../../shared/errors/BadRequestError');
const ConflictError = require('../../shared/errors/ConflictError');
const db = require('../../shared/database/connection');

const save = async (userId, projectId, role) => {
  if (role === 'owner') {
    throw new BadRequestError('Can not create another owner');
  }

  const participant = await participantRepository.getById(db, {
    userId,
    projectId,
  });

  if (participant) {
    throw new ConflictError('Participant', 'Already a member of project');
  }

  const result = await participantRepository.add(db, {
    userId,
    projectId,
    role,
  });

  if (result.affectedRows === 0) {
    throw new InternalError('Could not add participant');
  }

  return participantRepository.getById(db, { userId, projectId });
};

const remove = async (userId, projectId) => {
  const participant = await participantRepository.getById(db, {
    userId,
    projectId,
  });

  if (!participant) {
    throw new NotFoundError('Participant');
  }

  if (participant.role === 'owner') {
    throw new BadRequestError('Can not delete owner');
  }

  const result = await participantRepository.remove(db, {
    userId,
    projectId,
  });

  if (result.affectedRows === 0) {
    throw new NotFoundError('Participant');
  }
};

const updateRole = async (userId, projectId, role) => {
  if (role === 'owner') {
    throw new BadRequestError('Can not create another owner');
  }

  const participant = await participantRepository.getById(db, {
    userId,
    projectId,
  });

  if (!participant) {
    throw new NotFoundError('Participant');
  }

  if (participant.role === 'owner') {
    throw new BadRequestError('Can not change owners role');
  }

  const result = await participantRepository.updateRole(db, {
    userId,
    projectId,
    role,
  });

  if (result.affectedRows === 0) {
    throw new NotFoundError('Participant');
  }
};

const view = async (userId, projectId) => {
  const participant = await participantRepository.getById(db, {
    userId,
    projectId,
  });

  if (!participant) {
    throw new NotFoundError('Participant');
  }

  return participant;
};

const list = async (projectId) => {
  const participants = await participantRepository.getAll(db, {
    projectId,
  });

  return participants;
};

module.exports = {
  save,
  remove,
  updateRole,
  view,
  list,
};
