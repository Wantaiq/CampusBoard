const JoiBase = require('../../shared/util/JoiBase');

const addParticipant = JoiBase.object({
  role: JoiBase.string().trim().min(3).label('Role ').valid('member'),
  userId: JoiBase.number().integer().positive().required().label('User ID'),
});

const updateParticipantRole = JoiBase.object({
  role: JoiBase.string().trim().min(3).label('Role ').valid('member'),
});

module.exports = { addParticipant, updateParticipantRole };
