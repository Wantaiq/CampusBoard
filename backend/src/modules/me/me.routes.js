const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const meController = require('./me.controller');

router.use(authenticate);
router.get('/', meController.getMe);
router.get('/projects', meController.getMyProjects);
router.get('/tasks', meController.getMyTasks);

module.exports = router;
