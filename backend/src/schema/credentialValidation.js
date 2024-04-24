const Joi = require('joi');

const createSchema = Joi.object().keys({
  userId: Joi.string().required(),
  barcode: Joi.string().required()
});

const updateSchema = Joi.object().keys({
  isValid: Joi.boolean(),
  expiresAt: Joi.date()
});

module.exports = { createSchema, updateSchema };