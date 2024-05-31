import Joi from "joi"; // Framework para validación

// Esquema para validar vehículos

// Verificación para matrículas
const vehicleSchema = Joi.object({
  matricula: Joi.string()
    .required()
    .regex(/^[A-Z0-9]+$/)
    .length(6)
    .messages({
      "string.pattern.base": "La matrícula solo debe tener letras mayúsculas y números, y una longitud de 6 caracteres",
      "string.length": "La matrícula debe tener una longitud de 6 caracteres",
    }),

// Verificación modelo
    modelo: Joi.string()
    .required()
    .min(1)
    .max(60)
    .messages({
      "string.base": "El modelo debe ser una cadena de texto",
      "string.empty": "El modelo no puede estar vacío",
      "string.min": "El modelo debe tener al menos 1 carácter",
      "string.max": "El modelo no puede tener más de 60 caracteres",
    }),

// Verificacion marca
marca: Joi.string()
.required()
.min(1)
.max(60)
.messages({
  "string.base": "La marca debe ser una cadena de texto",
  "string.empty": "La marca no puede estar vacía",
  "string.min": "La marca debe tener al menos 1 carácter",
  "string.max": "La marca no puede tener más de 60 caracteres",
}),

// Verificación color
color: Joi.string()
.required()
.min(1)
.max(60)
.messages({
  "string.base": "El color debe ser una cadena de texto",
  "string.empty": "El color no puede estar vacío",
  "string.min": "El color debe tener al menos 1 carácter",
  "string.max": "El color no puede tener más de 60 caracteres",
}),

// Verificación foto
foto: Joi.any()
.optional()
.messages({
  "any.base": "La foto debe ser un archivo válido",
}),

// Verificación propietario
propietario: Joi.string()
    .optional()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "El propietario debe ser un ID de usuario válido",
    }), // Propietario opcional para permitir asignación automática
});

export default vehicleSchema; // Exporta el esquema de vehículos
