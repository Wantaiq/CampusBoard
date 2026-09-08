const multer = require('multer');
const path = require('path');
const BadRequestError = require('../shared/errors/BadRequestError');

const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.mimetype === 'application/pdf' && ext === '.pdf') {
    cb(null, true);
  } else {
    cb(new BadRequestError('Invalid file type'), false);
  }
};

const upload = multer({
  dest: 'documents/',
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
