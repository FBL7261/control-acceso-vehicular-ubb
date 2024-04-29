const Joi = require('joi');

const createSchema = Joi.object().keys({
  userId: Joi.string().required().messages({
    "string.empty": "El Id de usuario no puede estar vacío.",
    "any.required": "El Id de usuario es obligatorio."


  }),
  barcode: Joi.string().length(13).regex(/^[0-9]+$/, "numbers only").required().messages({
    "string.empty": "El codigo no puede estar vacío.",
    "any.required": "El codigo es obligatorio.",
    "string.length": "El codigo debe tener exactamente 13 caracteres.",
    "string.regex.base": "El codigo solo puede contener números."
  })
});

const updateSchema = Joi.object().keys({
  isValid: Joi.boolean(),
  expiresAt: Joi.date()
});

module.exports = { createSchema, updateSchema };