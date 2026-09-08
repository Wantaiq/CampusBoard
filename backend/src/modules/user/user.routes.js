const authenticate = require('../../middleware/authenticate');
const express = require('express');
const userController = require('./user.controller');
const router = express.Router();

router.use(authenticate);
router.get('/', userController.getUsers);
module.exports = router;
