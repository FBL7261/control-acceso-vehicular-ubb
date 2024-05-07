"use strict";

// Importaciones necesarias
import mongoose from "mongoose"; // Para validar `ObjectId`
import { respondSuccess, respondError } from "../utils/resHandler.js"; // Para manejar respuestas
import VehicleService from "../services/vehicle.service.js"; // Servicio para operaciones de vehículos
import vehicleSchema from "../schema/vehicle.schema.js"; // Esquema para validación de vehículos
import { handleError } from "../utils/errorHandler.js"; // Para manejar errores

// Crear un nuevo vehículo
async function createVehicle(req, res) {
  try {
    const { body } = req; // Datos del cuerpo de la solicitud
    const currentUserEmail = req.email; // Correo del usuario autenticado
    const isAdmin = req.roles.includes("admin"); // Verificar si es administrador

    const { error: bodyError } = vehicleSchema.validate(body); // Validar con el esquema
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message); // Manejar errores de validación
    }

    const [newVehicle, vehicleError] = await VehicleService.createVehicle(body, currentUserEmail, isAdmin);

    if (vehicleError) {
      return respondError(req, res, 400, vehicleError); // Manejo de errores
    }

    respondSuccess(req, res, 201, newVehicle); // Vehículo creado con éxito
  } catch (error) {
    handleError(error, "vehicle.controller -> createVehicle");
    respondError(req, res, 500, "No se pudo crear el vehículo");
  }
}

// Obtener vehículos por usuario
async function getVehiclesByUser(req, res) {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return respondError(req, res, 400, "El ID del usuario no es válido");
    }

    const [vehicles, vehicleError] = await VehicleService.getVehiclesByUserId(userId);

    if (vehicleError) {
      return respondError(req, res, 404, vehicleError); // Manejo de errores al obtener vehículos
    }

    respondSuccess(req, res, 200, vehicles); // Vehículos obtenidos con éxito
  } catch (error) {
    handleError(error, "vehicle.controller -> getVehiclesByUser");
    respondError(req, res, 500, "Error al obtener vehículos del usuario");
  }
}

// Eliminar un vehículo por su ID
async function deleteVehicle(req, res) {
  try {
    const { vehicleId } = req.params;
    const currentUserEmail = req.email; // Correo del usuario autenticado
    const isAdmin = req.roles.includes("admin"); // Verificar si es administrador

    if (!isAdmin) {
      return respondError(req, res, 403, "No autorizado", "Solo administradores pueden eliminar vehículos");
    }

    const [vehicleDeleted, vehicleError] = await VehicleService.deleteVehicle(vehicleId, currentUserEmail);

    if (vehicleError) {
      return respondError(req, res, 404, vehicleError); // Manejo de errores al eliminar vehículo
    }

    respondSuccess(req, res, 200, vehicleDeleted); // Vehículo eliminado con éxito
  } catch (error) {
    handleError(error, "vehicle.controller -> deleteVehicle");
    respondError(req, res, 500, "Error al eliminar el vehículo");
  }
}

export default {
  createVehicle,
  getVehiclesByUser,
  deleteVehicle,
};
