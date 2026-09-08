const AppError = require('./AppError');

class InternalError extends AppError {
  constructor(details) {
    super(500, 'Internal server error', details);
  }
}

module.exports = InternalError;
