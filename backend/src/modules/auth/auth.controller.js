const authService = require('../auth/auth.service');
const tryCatch = require('../../shared/util/tryCatch');
const AppResponse = require('../../shared/util/AppResponse');
const env = require('../../config/env');

const sendTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'strict',
    maxAge: parseInt(env.jwt.expiresInHours) * 60 * 60 * 1000,
  });
};

const register = tryCatch(async (req, res) => {
  const { id, username, token } = await authService.register(req.body.username, req.body.password);

  sendTokenCookie(res, token);
  res.status(201).json(new AppResponse(201, { id, username }));
});

const login = tryCatch(async (req, res) => {
  const { id, username, token } = await authService.login(req.body.username, req.body.password);

  sendTokenCookie(res, token);
  res.status(200).json(new AppResponse(200, { id, username }));
});

const logout = tryCatch(async (_req, res) => {
  res.clearCookie('token');
  res.status(200).json(new AppResponse(200));
});

module.exports = { register, login, logout };
