const projectSchema = require('../project/project.schema');
const JoiBase = require('../../shared/util/JoiBase');

const documentParams = JoiBase.object({
  documentId: JoiBase.number()
    .integer()
    .positive()
    .required()
    .label('Document ID'),
}).concat(projectSchema.projectParam);

module.exports = { documentParams };
