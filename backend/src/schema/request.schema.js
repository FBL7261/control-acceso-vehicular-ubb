"use strict";

import Joi from "joi";

const requestBodySchema = Joi.object({
    user: Joi.object({
      username: Joi.string().required().messages({
        "string.empty":"El nombre de usuario no puede quedar vacio",
        "any.required":"El nombre de usuario es requerido"
      }),
      rut: Joi.string().required().messages({
        "string.empty":"El rut no puede quedar vacio",
        "any.required":"El rut es requerido"
      }),
      email: Joi.string().required().messages({
        "string.empty":"El email no puede quedar vacio",
        "any.required":"El email es requerido",
        "string.email":"El email debe ser un correo valido"
      })
    }),
    document: Joi.array().items(Joi.string()).required().messages({
      "string.empty":"El documento no puede quedar vacio",
      "any.required":"El documento es requerido"
  }),
  });
  

const requestIdSchema = Joi.object({
    id: Joi.string().guid().required().messages({
        "string.empty":"El id no puede quedar vacio",
        "any.required":"El id es requerido"
    })
});

export {requestBodySchema, requestIdSchema};