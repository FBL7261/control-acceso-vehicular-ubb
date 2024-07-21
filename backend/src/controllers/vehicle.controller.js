"use strict";

import mongoose from "mongoose";

// Para permitir que modelo siga siendo requerido al crear un vehiculo
// pero que no sea aceptado al actualizar, en tal caso se recomienda crear un vehiculo nuevo.
import Joi from "joi";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import VehicleService from "../services/vehicle.service.js";
import vehicleSchema from "../schema/vehicle.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function createVehicle(req, res) {
  try {
    const { userId } = req.params;
    const currentUserEmail = req.email;

    // Validar que el userId en la URL sea un identificador válido
    if (!userId) {
      return respondError(req, res, 400, "ID de usuario no proporcionado");
    }

    // Verificar que el email del usuario actual exista en la base de datos
    const currentUser = await User.findOne({ email: currentUserEmail });

    if (!currentUser) {
      return respondError(req, res, 404, "Usuario autenticado no encontrado");
    }

    // Verificar que el usuario autenticado tenga permiso para crear vehículos
    if (currentUser._id.toString() !== userId) {
      return respondError(req, res, 403, "No tienes permiso para crear vehículos para otros usuarios");
    }

    // Crear un nuevo vehículo
    const newVehicle = new Vehicle({
      ...req.body,
      user: userId,
    });

    await newVehicle.save();

    respondSuccess(req, res, 201, newVehicle);
  } catch (error) {
    handleError(error, "vehicle.controller -> createVehicle");
    respondError(req, res, 500, "Error al crear el vehículo");
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
      return respondError(req, res, 403, "No tienes permiso para ver vehículos de otros usuarios");
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

async function updateVehicle(req, res) {
  try {
    const { vehicleId } = req.params;
    const vehicleData = req.body;
    const currentUserEmail = req.email;

    // Validar los datos de actualización permitidos
    const { error: bodyError } = Joi.object({
      matricula: Joi.string().required(),
      marca: Joi.string().required(),
      color: Joi.string().required(),
      modelo: Joi.string().optional(), // Permitir que el modelo sea opcional en la actualización
    }).validate(vehicleData);

    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    // Verificar si el usuario tiene permiso para editar el vehículo
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return respondError(req, res, 404, "Vehículo no encontrado");
    }

    if (vehicle.propietario.toString() !== currentUserEmail) {
      return respondError(req, res, 403, "No tienes permiso para editar este vehículo");
    }

    // Verificar si se intenta actualizar el modelo directamente
    if (vehicleData.modelo !== undefined) {
      return respondError(req, res, 400, "El modelo no puede ser actualizado directamente.");
    }

    // Verificar si se ha subido una foto nueva
    if (req.files && req.files.foto) {
      vehicleData.foto = req.files.foto[0].path; // Ajustar según la forma en que guardes las fotos
    }

    // Actualizar el vehículo
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
  getVehiclesByUser,
  deleteVehicle,
  updateVehicle,
};