import Joi from "joi"; // Framework para validación

// Esquema para validar vehículos
const vehicleSchema = Joi.object({
  matricula: Joi.string().required().alphanum().length(6), // Verificación para matrículas
  modelo: Joi.string().required(), // Modelo requerido
  marca: Joi.string().required(), // Marca requerida
  color: Joi.string().required(), // Color requerido
  foto: Joi.string().uri().optional(), // Foto opcional
  propietario: Joi.string().optional(), // Propietario opcional para permitir asignación automática
});

export default vehicleSchema; // Exporta el esquema de vehículos
