"use strict"; // Modo estricto para evitar errores comunes

import { respondSuccess, respondError } from "../utils/resHandler.js"; // Manejo de respuestas
import VehicleService from "../services/vehicle.service.js"; // Servicio para operaciones de vehículos
import vehicleSchema from "../schema/vehicle.schema.js"; // Validación para creación de vehículos
import { handleError } from "../utils/errorHandler.js"; // Manejo de errores

// Crear un nuevo vehículo
async function createVehicle(req, res) {
  try {
    const { body } = req; // Obtener datos del cuerpo de la solicitud
    const { error: bodyError } = vehicleSchema.validate(body); // Validar los datos
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message); // Respuesta de error si la validación falla
    }

    const newVehicle = await VehicleService.createVehicle(body); // Crear el vehículo con el servicio
    respondSuccess(req, res, 201, newVehicle); // Respuesta exitosa con código 201 (Creado)
  } catch (error) {
    handleError(error, "vehicle.controller -> createVehicle"); // Manejo de errores
    respondError(req, res, 500, "No se pudo crear el vehículo"); // Respuesta de error genérico
  }
}

// Obtener todos los vehículos de un usuario
async function getVehiclesByUser(req, res) {
  try {
    const { userId } = req.params; // Obtener el ID del usuario desde los parámetros de la ruta
    const vehicles = await VehicleService.getVehiclesByUser(userId); // Obtener vehículos por usuario
    respondSuccess(req, res, 200, vehicles); // Respuesta exitosa con código 200 (OK)
  } catch (error) {
    handleError(error, "vehicle.controller -> getVehiclesByUser");
    respondError(req, res, 500, "Error obteniendo vehículos del usuario"); // Error genérico
  }
}

// Eliminar un vehículo por su ID
async function deleteVehicle(req, res) {
  try {
    const { vehicleId } = req.params; // Obtener el ID del vehículo
    const vehicle = await VehicleService.deleteVehicle(vehicleId); // Eliminar el vehículo
    if (!vehicle) {
      return respondError(
        req,
        res,
        404,
        "Vehículo no encontrado",
        "Verifique el ID ingresado" // Error si no se encuentra el vehículo
      );
    }

    respondSuccess(req, res, 200, vehicle); // Respuesta exitosa
  } catch (error) {
    handleError(error, "vehicle.controller -> deleteVehicle"); // Manejo de errores
    respondError(req, res, 500, "No se pudo eliminar el vehículo"); // Error genérico
  }
}

// Exporta las funciones del controlador
export default {
  createVehicle,
  getVehiclesByUser,
  deleteVehicle,
};
