const tryCatch = require('../../shared/util/tryCatch');
const participantService = require('./participant.service');
const AppResponse = require('../../shared/util/AppResponse');

const createParticipant = tryCatch(async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;

  const participant = await participantService.save(userId, projectId, role);

  res.status(201).json(new AppResponse(201, participant));
});

const deleteParticipant = tryCatch(async (req, res) => {
  const { userId, projectId } = req.params;

  await participantService.remove(userId, projectId);

  res.status(200).json(new AppResponse(200));
});

const updateParticipantRole = tryCatch(async (req, res) => {
  const { userId, projectId } = req.params;
  const { role } = req.body;

  await participantService.updateRole(userId, projectId, role);

  res.status(200).json(new AppResponse(200));
});

const viewParticipant = tryCatch(async (req, res) => {
  const { userId, projectId } = req.params;

  const participant = await participantService.view(userId, projectId);

  res.status(200).json(new AppResponse(200, participant));
});

const listParticipants = tryCatch(async (req, res) => {
  const { projectId } = req.params;

  const participants = await participantService.list(projectId);

  res.status(200).json(new AppResponse(200, participants));
});

module.exports = {
  createParticipant,
  deleteParticipant,
  updateParticipantRole,
  viewParticipant,
  listParticipants,
};
