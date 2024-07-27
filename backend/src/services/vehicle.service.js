"use strict";

import mongoose from "mongoose";
import Vehicle from "../models/vehicle.model.js";
import User from "../models/user.model.js";
import { handleError } from "../utils/errorHandler.js";

async function createVehicle(vehicleData, currentUserEmail, isAdmin) {
  try {
    if (!isAdmin) {
      const currentUser = await User.findOne({ email: currentUserEmail });
      if (!currentUser) {
        return [null, "El usuario autenticado no existe"];
      }
      vehicleData.propietario = currentUser._id;
    }

    const newVehicle = new Vehicle(vehicleData);

    const savedVehicle = await newVehicle.save();

    return [savedVehicle, null];
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.matricula) {
      return [null, "Esta matrícula no está disponible"];
    }
    handleError(error, "vehicle.service -> createVehicle");
    return [null, "Error al crear el vehículo"];
  }
}

async function getVehiclesByUserId(userId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [null, "El ID del usuario no es válido"];
    }

    const vehicles = await Vehicle.find({ propietario: userId });

    return [vehicles, null];
  } catch (error) {
    handleError(error, "vehicle.service -> getVehiclesByUserId");
    return [null, "Error al obtener vehículos del usuario"];
  }
}

async function deleteVehicle(vehicleId, currentUserEmail) {
  try {
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return [null, "El ID del vehículo no es válido"];
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return [null, "El vehículo no existe"];
    }

    const propietario = await User.findById(vehicle.propietario);
    if (!propietario || propietario.email !== currentUserEmail) {
      return [null, "No tienes permiso para eliminar este vehículo"];
    }

    const vehicleDeleted = await vehicle.remove();

    if (propietario) {
      propietario.vehicles.pull(vehicleId);
      await propietario.save();
    }

    return [vehicleDeleted, null];
  } catch (error) {
    handleError(error, "vehicle.service -> deleteVehicle");
    return [null, "Error al eliminar el vehículo"];
  }
}

export default {
  createVehicle,
  getVehiclesByUserId,
  deleteVehicle,
  updateVehicle,
};
