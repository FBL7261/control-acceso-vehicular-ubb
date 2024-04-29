import Joi from "joi";

// Define el esquema para el vehículo
const vehicleSchema = Joi.object({
  plate: Joi.string().required().alphanum().length(6),
  model: Joi.string().required(),
  brand: Joi.string().required(),
  color: Joi.string().required(),
  photo: Joi.string().uri().optional(), // Campo opcional
  owner: Joi.string().required(),
});

export default vehicleSchema; // Exporta solo el esquema de vehículo
