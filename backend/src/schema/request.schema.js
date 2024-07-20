"use strict";

import Joi from "joi";

const requestBodySchema = Joi.object({
    user: Joi.string().required().messages({
        "string.empty": "El usuario no puede quedar vacío",
        "any.required": "El usuario es requerido",
    }),
    
    description: Joi.string()
    .required()
    .min(1)
    .max(255)
    .messages({
        "string.empty": "La descripción no puede quedar vacía",
        "any.required": "La descripción es requerida",
        "string.min": "La descripción debe tener al menos 1 carácter",
    }),

    createdAt: Joi.date()
    .optional()
    .messages({
        "date.base": "La fecha de creación debe ser una fecha válida",
        "string.empty": "La fecha de creación no puede quedar vacía",
    }),

    updatedAt: Joi.date()
    .optional()
    .messages({
        "date.base": "La fecha de actualización debe ser una fecha válida",
        "string.empty": "La fecha de actualización no puede quedar vacía",
    })

});

const requestIdSchema = Joi.object({
    id: Joi.string()
      .required()
      .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
      .messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
        "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
      }),
  });
  

export { requestBodySchema, requestIdSchema };
