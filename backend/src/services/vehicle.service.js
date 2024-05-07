"use strict";

import mongoose from "mongoose"; // Para validar `ObjectId`
import Vehicle from "../models/vehicle.model.js"; // Modelo de vehículos
import User from "../models/user.model.js"; // Modelo de usuario
import { handleError } from "../utils/errorHandler.js"; // Para manejar errores

// Crear un nuevo vehículo
async function createVehicle(vehicleData, currentUserEmail, isAdmin) {
  try {
    if (!isAdmin) {
      // Si no es administrador, asignar automáticamente al usuario autenticado
      const currentUser = await User.findOne({ email: currentUserEmail });
      if (!currentUser) {
        return [null, "El usuario autenticado no existe"];
      }
      vehicleData.owner = currentUser._id; // Asignar al usuario autenticado
    }

    const newVehicle = new Vehicle(vehicleData); // Crear el vehículo
    await newVehicle.save(); // Guardar en la base de datos

    return [newVehicle, null]; // Vehículo creado con éxito
  } catch (error) {
    handleError(error, "vehicle.service -> createVehicle");
    return [null, "Error al crear el vehículo"];
  }
}

// Obtener todos los vehículos de un usuario
async function getVehiclesByUserId(userId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [null, "El ID del usuario no es válido"];
    }

    // Buscar los vehículos cuyo `owner` coincida con el `ObjectId` del usuario
    const vehicles = await Vehicle.find({ owner: userId });

    return [vehicles, null]; // Retornar la lista de vehículos
  } catch (error) {
    handleError(error, "vehicle.service -> getVehiclesByUserId");
    return [null, "Error al obtener vehículos del usuario"];
  }
}


// Eliminar un vehículo por su ID
async function deleteVehicle(vehicleId, userId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return [null, "El ID del vehículo no es válido"];
    }

    const vehicleDeleted = await Vehicle.findByIdAndDelete(vehicleId);

    if (!vehicleDeleted) {
      return [null, "El vehículo no existe"];
    }

    const userFound = await User.findById(userId);
    if (userFound) {
      userFound.vehicles.pull(vehicleId); // Eliminar referencia del vehículo
      await userFound.save();
    }

    return [vehicleDeleted, null]; // Vehículo eliminado con éxito
  } catch (error) {
    handleError(error, "vehicle.service -> deleteVehicle");
    return [null, "Error al eliminar el vehículo"];
  }
}

export default {
  createVehicle,
  getVehiclesByUserId,
  deleteVehicle,
};
