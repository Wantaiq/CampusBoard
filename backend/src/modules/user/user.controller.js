const AppResponse = require('../../shared/util/AppResponse');
const tryCatch = require('../../shared/util/tryCatch');
const userService = require('./user.service');

const getUsers = tryCatch(async (req, res) => {
  const users = await userService.viewUserByPartialUsername(req.query.username);

  res.status(200).json(new AppResponse(200, users));
});

module.exports = { getUsers };
