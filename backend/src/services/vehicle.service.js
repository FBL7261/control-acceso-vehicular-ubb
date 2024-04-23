"use strict";

// Importa el modelo de vehículo y el modelo de usuario
import Vehicle from "../models/vehicle.model.js";
import User from "../models/user.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Crea un nuevo vehículo y lo asocia con un usuario
 * @param {string} userId - ID del usuario propietario del vehículo
 * @param {Object} vehicleData - Datos del vehículo a crear
 * @returns {Promise} - Promesa con el objeto del vehículo creado
 */
async function createVehicle(userId, vehicleData) {
  try {
    // Verifica que el usuario exista
    const userFound = await User.findById(userId);
    if (!userFound) {
      return [null, "El usuario no existe"];
    }

    // Crea el nuevo vehículo
    const newVehicle = new Vehicle({
      ...vehicleData,
      owner: userId,
    });

    await newVehicle.save(); // Guarda el vehículo en la base de datos

    // Agrega el vehículo al usuario
    userFound.vehicles.push(newVehicle._id);
    await userFound.save(); // Actualiza el usuario con el vehículo agregado

    return [newVehicle, null];
  } catch (error) {
    handleError(error, "vehicle.service -> createVehicle");
  }
}

/**
 * Obtiene todos los vehículos de un usuario
 * @param {string} userId - ID del usuario propietario de los vehículos
 * @returns {Promise} - Promesa con la lista de vehículos
 */
async function getVehiclesByUserId(userId) {
  try {
    const userFound = await User.findById(userId).populate("vehicles");
    if (!userFound) {
      return [null, "El usuario no existe"];
    }

    const vehicles = userFound.vehicles;
    return [vehicles, null];
  } catch (error) {
    handleError(error, "vehicle.service -> getVehiclesByUserId");
  }
}

/**
 * Elimina un vehículo por su ID y lo remueve del usuario
 * @param {string} vehicleId - ID del vehículo a eliminar
 * @param {string} userId - ID del usuario propietario
 * @returns {Promise} - Promesa con el objeto del vehículo eliminado
 */
async function deleteVehicle(vehicleId, userId) {
  try {
    // Elimina el vehículo por su ID
    const vehicleDeleted = await Vehicle.findByIdAndDelete(vehicleId);

    if (!vehicleDeleted) {
      return [null, "El vehículo no existe"];
    }

    // Elimina la referencia del vehículo en el usuario
    const userFound = await User.findById(userId);
    if (userFound) {
      userFound.vehicles.pull(vehicleId);
      await userFound.save();
    }

    return [vehicleDeleted, null];
  } catch (error) {
    handleError(error, "vehicle.service -> deleteVehicle");
  }
}

export default {
  createVehicle,
  getVehiclesByUserId,
  deleteVehicle,
};
