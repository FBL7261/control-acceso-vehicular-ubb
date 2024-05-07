import Joi from "joi"; // Framework para validación

// Esquema para validar vehículos
const vehicleSchema = Joi.object({
  plate: Joi.string().required().alphanum().length(6), // Verificación para placas
  model: Joi.string().required(), // Modelo requerido
  brand: Joi.string().required(), // Marca requerida
  color: Joi.string().required(), // Color requerido
  photo: Joi.string().uri().optional(), // Foto opcional
  owner: Joi.string().optional(), // Propietario opcional para permitir asignación automática
});

export default vehicleSchema; // Exporta el esquema de vehículos
