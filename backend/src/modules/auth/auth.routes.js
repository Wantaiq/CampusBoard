const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const authSchema = require('./auth.schema');
const validation = require('../../middleware/validation');

router.post('/register', validation(authSchema), authController.register);
router.post('/login', validation(authSchema), authController.login);
router.post('/logout', authController.logout);

module.exports = router;
