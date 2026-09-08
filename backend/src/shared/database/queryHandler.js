const InternalError = require('../errors/InternalError');

function queryHandler(query) {
  return async (...args) => {
    try {
      return await query(...args);
    } catch (error) {
      console.log(error);
      throw new InternalError('Something went wrong');
    }
  };
}

module.exports = queryHandler;
