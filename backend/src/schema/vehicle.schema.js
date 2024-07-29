import Joi from "joi";

const vehicleSchema = Joi.object({
  matricula: Joi.string()
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    })
    .regex(/^[A-Z0-9]{6}$/)
    .messages({
      "string.pattern.base": "La matrícula debe contener solo letras mayúsculas y números, y tener una longitud de 6 caracteres.",
      "any.required": "La matrícula es obligatoria.",
    }),

  modelo: Joi.string()
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    })
    .min(1)
    .max(60)
    .messages({
      "string.base": "El modelo debe ser una cadena de texto",
      "string.empty": "El modelo no puede estar vacío",
      "string.min": "El modelo debe tener al menos 1 carácter",
      "string.max": "El modelo no puede tener más de 60 caracteres",
      "any.required": "El modelo es obligatorio.",
    }),

  marca: Joi.string()
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    })
    .min(1)
    .max(60)
    .messages({
      "string.base": "La marca debe ser una cadena de texto",
      "string.empty": "La marca no puede estar vacía",
      "string.min": "La marca debe tener al menos 1 carácter",
      "string.max": "La marca no puede tener más de 60 caracteres",
      "any.required": "La marca es obligatoria.",
    }),

  color: Joi.string()
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    })
    .regex(/^[a-zA-Z\s]+$/)
    .min(1)
    .max(60)
    .messages({
      "string.base": "El color debe ser una cadena de texto",
      "string.empty": "El color no puede estar vacío",
      "string.min": "El color debe tener al menos 1 carácter",
      "string.max": "El color no puede tener más de 60 caracteres",
      "string.pattern.base": "El color no puede contener números.",
      "any.required": "El color es obligatorio.",
    }),

  foto: Joi.string()
    .optional()
    .uri()
    .messages({
      "string.uri": "La foto debe ser una URL válida.",
    }),

  propietario: Joi.string()
    .optional()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "El propietario debe ser un ID de usuario válido",
    }),
});

export default vehicleSchema;