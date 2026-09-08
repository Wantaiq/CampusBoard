const projectService = require('../modules/project/project.service');

function authorizeProjectPermission(allowedRoles) {
  return async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { projectId } = req.params;
      const participant = await projectService.authorizeProjectPermission(
        userId,
        projectId,
        allowedRoles,
      );

      req.user = {
        id: participant.user_id,
        role: participant.role,
        username: participant.username,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = authorizeProjectPermission;
