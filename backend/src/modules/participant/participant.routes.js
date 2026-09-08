const express = require('express');
const participantController = require('./participant.controller');
const authorizeProjectPermission = require('../../middleware/authorize');
const validation = require('../../middleware/validation');
const projectSchema = require('../project/project.schema');
const userSchema = require('../user/user.schema');
const participantSchema = require('./participant.schema');
const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .all(
    validation(null, projectSchema.projectParam),
    authorizeProjectPermission(['owner', 'member']),
  )
  .get(participantController.listParticipants)
  .post(validation(participantSchema.addParticipant), participantController.createParticipant);

router
  .route('/:userId')
  .all(validation(null, projectSchema.projectParam.concat(userSchema.userParam)))
  .get(authorizeProjectPermission(['owner', 'member']), participantController.viewParticipant)
  .all(authorizeProjectPermission(['owner']))
  .delete(participantController.deleteParticipant)
  .patch(
    validation(participantSchema.updateParticipantRole),
    participantController.updateParticipantRole,
  );

module.exports = router;
