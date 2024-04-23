import Joi from 'joi';

// Define el esquema de validación para el vehículo
const vehicleSchema = Joi.object({
  plate: Joi.string()
    .required()
    .alphanum()
    .length(6) // Longitud esperada para una patente (puede variar según el país)
    .messages({
      'string.alphanum': 'La patente solo puede contener caracteres alfanuméricos.',
      'string.length': 'La patente debe tener 6 caracteres.',
      'any.required': 'La patente es obligatoria.',
    }),
  model: Joi.string()
    .required()
    .messages({
      'any.required': 'El modelo es obligatorio.',
    }),
  brand: Joi.string()
    .required()
    .messages({
      'any.required': 'La marca es obligatoria.',
    }),
  color: Joi.string()
    .required()
    .messages({
      'any.required': 'El color es obligatorio.',
    }),
  photo: Joi.string()
    .uri() // Si es una URL, debe ser válida
    .messages({
      'string.uri': 'La foto debe ser una URL válida.',
    }),
  owner: Joi.string()
    .required()
    .messages({
      'any.required': 'El propietario es obligatorio.',
    }),
});

export default vehicleSchema;
