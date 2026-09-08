const multer = require('multer');
const AppError = require('../shared/errors/AppError');
const { ValidationError } = require('joi');

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      details: err.details,
      success: err.success,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: 'Bad Request',
      statusCode: 400,
      details: err.details[0].message,
      success: false,
    });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Bad request',
        statusCode: 413,
        details: 'File too large',
        sucess: false,
      });
    } else {
      return res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        statusCode: 500,
        details: 'Upload failed',
      });
    }
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    statusCode: 500,
    success: false,
    details: 'Something went wrong',
  });
};

module.exports = errorHandler;
