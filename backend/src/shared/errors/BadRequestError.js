const AppError = require('./AppError');

class BadRequestError extends AppError {
  constructor(details) {
    super(400, 'Bad Request', details);
  }
}

module.exports = BadRequestError;
