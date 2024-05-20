import Joi from "joi"; // Framework para validación

// Esquema para validar vehículos
const vehicleSchema = Joi.object({
  matricula: Joi.string().required().regex(/^[A-Z0-9]+$/).length(6).message('La matrícula solo debe contener letras mayúsculas y números, y tener una longitud de 6 caracteres'), // Verificación para matrículas
  modelo: Joi.string().required(), // Modelo requerido
  marca: Joi.string().required(), // Marca requerida
  color: Joi.string().required(), // Color requerido
  foto: Joi.string().uri().optional(), // Foto opcional
  propietario: Joi.string().optional(), // Propietario opcional para permitir asignación automática
});

export default vehicleSchema; // Exporta el esquema de vehículos
