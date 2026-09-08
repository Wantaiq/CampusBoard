const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(resource, details) {
    super(404, `${resource} not found`, details);
  }
}

module.exports = NotFoundError;
