const JoiBase = require('../../shared/util/JoiBase');

const authSchema = JoiBase.object({
  username: JoiBase.string().trim().alphanum().min(3).required().label('Username'),
  password: JoiBase.string().trim().min(7).required().label('Password'),
});

module.exports = authSchema;
