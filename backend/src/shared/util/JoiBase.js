const Joi = require('joi');

const JoiBase = Joi.defaults((schema) =>
  schema
    .options({
      abortEarly: true,
      stripUnknown: true,
      errors: {
        wrap: { label: false, array: false },
      },
    })
    .messages({
      'string.base': '{{#label}} needs to a text',
      'string.empty': '{{#label}} cannot be empty',
      'string.min': '{{#label}} must be at least {{#limit}} characters long',
      'any.only': '{{#label}} can be {{#valids}}',
      'any.required': '{{#label}} is required',
    }),
);

module.exports = JoiBase;
