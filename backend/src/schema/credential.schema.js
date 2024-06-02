import Joi from 'joi';

const credentialsBodySchema = Joi.object().keys({

  //Verificacion del id de usuario
  
  userId: Joi.string().required().messages({
    "string.empty": "El Id de usuario no puede estar vacío.",
    "any.required": "El Id de usuario es obligatorio."


  }),

  //Verificacion del codigo de barras

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

export {credentialsBodySchema, updateSchema};