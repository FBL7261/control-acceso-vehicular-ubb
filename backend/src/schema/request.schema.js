"use strict";

import Joi from "joi";

const requestBodySchema = Joi.object({

    user: Joi.string().required().messages({
        "string.empty":"El usuario no puede quedar vacia",
        "any.required":"El usuario se requiere"
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