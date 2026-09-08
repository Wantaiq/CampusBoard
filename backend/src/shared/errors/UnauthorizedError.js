const AppError = require('./AppError');

class UnauthorizedError extends AppError {
  constructor(details) {
    super(401, 'Unauthorized', details);
  }
}

module.exports = UnauthorizedError;
