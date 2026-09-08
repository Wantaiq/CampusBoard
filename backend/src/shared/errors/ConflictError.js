const AppError = require('./AppError');

class ConflictError extends AppError {
  constructor(resource, details) {
    super(
      409,
      `${resource} already exists`,
      details || `${resource} already exists`,
    );
  }
}

module.exports = ConflictError;
