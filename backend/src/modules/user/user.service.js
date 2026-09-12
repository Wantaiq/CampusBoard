const ConflictError = require('../../shared/errors/ConflictError');
const NotFoundError = require('../../shared/errors/NotFoundError');
const db = require('../../shared/database/connection');
const userRepository = require('./user.repository');

const viewOneById = async (id) => {
  const user = await userRepository.findOneById(db, { id });
  if (!user) {
    throw new NotFoundError('User', 'User does not exist');
  }

  return user;
};

const viewUserByUsernameWithPassword = async (username) => {
  const user = await userRepository.findOneByUsername(db, {
    username,
  });
  if (!user) {
    throw new NotFoundError('User', 'User does not exist');
  }

  return user;
};

const saveUser = async (username, password) => {
  const existingUser = await userRepository.findOneByUsername(db, {
    username,
  });

  if (existingUser) {
    throw new ConflictError('User', 'Username already in use');
  }

  const user = await userRepository.save(db, {
    username,
    password,
  });

  return user;
};

const viewUserByPartialUsername = async (username) => {
  return userRepository.listUsersByPartialUsername(db, { username });
};

module.exports = {
  viewOneById,
  saveUser,
  viewUserByUsernameWithPassword,
  viewUserByPartialUsername,
};
