const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../user/user.service');
const UnauthorizedError = require('../../shared/errors/UnauthorizedError');
const env = require('../../config/env');

const hashData = async (data) => {
  return bcrypt.hash(data, 12);
};

const compareHash = async (string, hash) => {
  return bcrypt.compare(string, hash);
};

const signJwt = (id, username) => {
  return jwt.sign(
    {
      id,
      username,
    },
    env.jwt.secret,
    { expiresIn: `${env.jwt.expiresInHours}h` },
  );
};

const verifyJwt = (token) => {
  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }

    throw error;
  }
};

const authenticate = (token) => {
  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  return verifyJwt(token);
};

const validateUser = async (username, password) => {
  const user = await userService.viewUserByUsernameWithPassword(username);
  const isMatch = await compareHash(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedError('Invalid username or password.');
  }

  return { id: user.id, username: user.username };
};

const register = async (username, password) => {
  const passwordHash = await hashData(password);

  const user = await userService.saveUser(username, passwordHash);
  const token = signJwt(user.id, user.username);

  return {
    id: user.id,
    username: user.username,
    token: token,
  };
};

const login = async (username, password) => {
  try {
    const user = await validateUser(username, password);
    const token = signJwt(user.id, user.username);

    return {
      id: user.id,
      username: user.username,
      token: token,
    };
  } catch (err) {
    throw new UnauthorizedError('Invalid username or password.');
  }
};

module.exports = {
  register,
  login,
  verifyJwt,
  authenticate,
};
