import joi from "joi";
//import stateEntry from "../constants/stateEntry.constants";

const regEntryBodySchema = joi.object({
    rut: joi.string().required().min(9).max(10)
    .pattern(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/).messages({
        "string.empty": "El rut no puede estar vacío.",
        "any.required": "El rut es obligatorio.",
        "string.base": "El rut debe ser de tipo string.",
        "string.min": "El rut debe tener al menos 9 caracteres.",
        "string.max": "El rut debe tener al menos 10 caracteres.",
        "string.pattern.base": "El rut tiene el formato XXXXXXXX-X, ejemplo: 12345678-9.",
    }),
    plate: joi.string().required().messages({
        "string.empty": "La patente no puede estar vacía.",
        "any.required": "La patente es obligatoria.",
        "string.base": "La patente debe ser de tipo string.",
    }),
    name: joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
    }),
    // state: joi.array().items(joi.string().valid(...stateEntry)).required().messages({
    //     "string.empty": "El estado no puede estar vacío.",
    //     "any.required": "El estado es obligatorio.",
    //     "string.base": "El estado debe ser de tipo string.",
    //     "any.only": "El estado proporcionado no es válido.",
    // }),
    reason: joi.string().required().messages({
        "string.empty": "La razón no puede estar vacía.",
        "any.required": "La razón es obligatoria.",
        "string.base": "La razón debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { regEntryBodySchema };