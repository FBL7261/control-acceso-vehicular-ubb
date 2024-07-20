"use strict";

// Importaciones necesarias

// Para validar `ObjectId`
import mongoose from "mongoose";

// Para manejar respuestas

// Importar usuario
import User from "../models/user.model.js";

// Importar vehiculo
import Vehicle from "../models/vehicle.model.js";

// Manejo de respuestas
import { respondSuccess, respondError } from "../utils/resHandler.js";

// Servicio para operaciones de vehículos

import VehicleService from "../services/vehicle.service.js";
 
// Esquema para validación de vehículos
import vehicleSchema from "../schema/vehicle.schema.js";

 // Para manejo de errores
import { handleError } from "../utils/errorHandler.js";

// Crear un nuevo vehículo, automaticamente se le asigna al usuario actual
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

// Crear un nuevo vehículo, automaticamente se le asigna al usuario actual
async function createVehicleWhPhoto(req, res) {
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

// Obtener vehículos del usuario actual mediante su propio ID
async function getVehiclesByUser(req, res) {
  try {
    const { userId } = req.params; // El ID que viene en la solicitud
    const currentUserEmail = req.email; // Correo del usuario autenticado

    // Buscar el usuario autenticado para obtener su ID
    const currentUser = await User.findOne({ email: currentUserEmail });

    if (!currentUser) {
      return respondError(req, res, 404, "Usuario autenticado no encontrado");
    }

    // Asegurarse de que el usuario autenticado solo pueda acceder a sus propios vehículos
    if (currentUser._id.toString() !== userId) {
      return respondError(
        req,
        res,
        403,
        "No tienes permiso para ver vehículos de otros usuarios",
      );
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
    const currentUserEmail = req.email;

    // Validar el ID del vehículo
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return respondError(req, res, 400, "El ID del vehículo no es válido");
    }

    // Buscar el vehículo
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return respondError(req, res, 404, "El vehículo no se encontró");
    }

    // Verificar que el usuario actual sea el propietario
    const propietario = await User.findById(vehicle.propietario);
    if (!propietario || propietario.email !== currentUserEmail) {
      return respondError(req, res, 403, "No tienes permiso para eliminar este vehículo");
    }

    // Eliminar el vehículo
    await Vehicle.findByIdAndDelete(vehicleId); // Usar `findByIdAndDelete` para eliminar
    respondSuccess(req, res, 200, "Vehículo eliminado con éxito");
  } catch (error) {
    handleError(error, "vehicle.controller -> deleteVehicle");
    respondError(req, res, 500, "Error al eliminar el vehículo");
  }
}

 // Actualizar un vehículo por su ID
async function updateVehicle(req, res) {
  try {
    const { vehicleId } = req.params;
    const vehicleData = req.body;
    const currentUserEmail = req.email;

    const { error: bodyError } = vehicleSchema.validate(vehicleData);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    const [updatedVehicle, updateError] = await VehicleService.updateVehicle(vehicleId, vehicleData, currentUserEmail);
    if (updateError) {
      return respondError(req, res, 403, updateError);
    }

    respondSuccess(req, res, 200, updatedVehicle);
  } catch (error) {
    handleError(error, "vehicle.controller -> updateVehicle");
    respondError(req, res, 500, "Error al actualizar el vehículo");
  }
}


export default {
  createVehicle,
  createVehicleWhPhoto,
  getVehiclesByUser,
  deleteVehicle,
  updateVehicle,
};