"use strict";

import mongoose from "mongoose";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import VehicleService from "../services/vehicle.service.js";
import vehicleSchema from "../schema/vehicle.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function createVehicle(req, res) {
  try {
    const { body } = req;
    const currentUserEmail = req.email;
    const isAdmin = req.roles.includes("admin");

    // Validar los datos del vehículo con el esquema
    const { error: bodyError } = vehicleSchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    // Verificar si se ha subido una foto
    if (req.files && req.files.foto) {
      // Guardar solo el nombre del archivo
      body.foto = req.files.foto[0].filename;
    }

    const [newVehicle, vehicleError] = await VehicleService.createVehicle(body, currentUserEmail, isAdmin);

    if (vehicleError) {
      return respondError(req, res, 400, vehicleError);
    }

    respondSuccess(req, res, 201, newVehicle);
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
      return respondError(req, res, 403, "No tienes permiso para ver vehículos de otros usuarios");
    }

    const [vehicles, vehicleError] = await VehicleService.getVehiclesByUserId(userId);

    if (vehicleError) {
      return respondError(req, res, 404, vehicleError); // Manejo de errores al obtener vehículos
    }

    // Asegurarse de que cada vehículo tenga la propiedad foto
    const vehiclesWithPhoto = vehicles.map(vehicle => ({
      ...vehicle._doc,
      foto: vehicle.foto || null // Asegúrate de devolver null si la foto no está definida
    }));

    respondSuccess(req, res, 200, vehiclesWithPhoto); // Vehículos obtenidos con éxito
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
    await Vehicle.findByIdAndDelete(vehicleId); // Usar findByIdAndDelete para eliminar
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

async function getVehicleById(req, res) {

  try {

    const { vehicleId } = req.params;


    const [vehicle, vehicleError] = await VehicleService.getVehicleById(vehicleId);

    if (vehicleError) {

      return respondError(req, res, 404, vehicleError);

    }


    respondSuccess(req, res, 200, vehicle);

  } catch (error) {

    handleError(error, "vehicle.controller -> getVehicleById");

    respondError(req, res, 500, "Error al obtener el vehículo");

  }

}

export default {
  createVehicle,
  getVehiclesByUser,
  deleteVehicle,
  updateVehicle,
  getVehicleById,
};
