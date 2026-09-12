const authService = require('../modules/auth/auth.service');

const authenticate = (req, _res, next) => {
  try {
    const token = req.cookies?.token;

    const decodedPayload = authService.authenticate(token);
    req.user = {
      id: decodedPayload.id,
      username: decodedPayload.username,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
