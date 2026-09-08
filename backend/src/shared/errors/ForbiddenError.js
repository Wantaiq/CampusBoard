const AppError = require('./AppError');

class ForbiddenError extends AppError {
  constructor() {
    super(403, 'Forbidden', 'Access Denied');
  }
}

module.exports = ForbiddenError;
