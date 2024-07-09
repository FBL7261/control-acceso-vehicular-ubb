"use strict";

import Joi from "joi";

const requestBodySchema = Joi.object({
    user: Joi.object({
        
        username: Joi.string()
        .required()
        .regex(/^[a-zA-Z\s]+$/)
        .messages({
            "string.empty": "El nombre de usuario no puede quedar vacio",
            "any.required": "El nombre de usuario es requerido",
            "string.pattern.base": "El nombre de usuario no puede contener números"
        }),

        rut: Joi.string()
        .required()
        .pattern(/^[0-9]{7,8}-[0-9kK]{1}$/)
        .messages({
            "string.empty": "El rut no puede quedar vacio",
            "any.required": "El rut es requerido",
            "string.base": "El rut debe ser de tipo string",
            "string.pattern.base": "El rut debe tener el formato 1234567-8 o 12345678-9"
        }),

        email: Joi.string().email()
        .required()
        .pattern(/^[a-zA-Z0-9._%+-]+@email\.com$/)
        .messages({
            "string.empty": "El email no puede quedar vacio",
            "any.required": "El email es requerido",
            "string.email": "El email debe ser un correo valido",
            "string.pattern.base": "El email debe terminar con @email.com"
        }),
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
