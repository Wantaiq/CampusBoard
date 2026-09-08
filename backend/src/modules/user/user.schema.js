const JoiBase = require('../../shared/util/JoiBase');

const userParam = JoiBase.object({
  userId: JoiBase.number().integer().positive().required().label('User ID'),
});

module.exports = { userParam };
