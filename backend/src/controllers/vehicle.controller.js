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

    const { error: bodyError } = vehicleSchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    if (req.files && req.files.foto) {
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

async function getVehiclesByUser(req, res) {
  try {
    const { userId } = req.params;
    const currentUserEmail = req.email;

    const currentUser = await User.findOne({ email: currentUserEmail });

    if (!currentUser) {
      return respondError(req, res, 404, "Usuario autenticado no encontrado");
    }

    if (currentUser._id.toString() !== userId) {
      return respondError(req, res, 403, "No tienes permiso para ver vehículos de otros usuarios");
    }

    const [vehicles, vehicleError] = await VehicleService.getVehiclesByUserId(userId);

    if (vehicleError) {
      return respondError(req, res, 404, vehicleError);
    }

    const vehiclesWithPhoto = vehicles.map(vehicle => ({
      ...vehicle._doc,
      foto: vehicle.foto || null,
    }));

    respondSuccess(req, res, 200, vehiclesWithPhoto);
  } catch (error) {
    handleError(error, "vehicle.controller -> getVehiclesByUser");
    respondError(req, res, 500, "Error al obtener vehículos del usuario");
  }
}

async function deleteVehicle(req, res) {
  try {
    const { vehicleId } = req.params;
    const currentUserEmail = req.email;

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return respondError(req, res, 400, "El ID del vehículo no es válido");
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return respondError(req, res, 404, "El vehículo no se encontró");
    }

    const propietario = await User.findById(vehicle.propietario);
    if (!propietario || propietario.email !== currentUserEmail) {
      return respondError(req, res, 403, "No tienes permiso para eliminar este vehículo");
    }

    await Vehicle.findByIdAndDelete(vehicleId);
    respondSuccess(req, res, 200, "Vehículo eliminado con éxito");
  } catch (error) {
    handleError(error, "vehicle.controller -> deleteVehicle");
    respondError(req, res, 500, "Error al eliminar el vehículo");
  }
}

export const getVehicleModels = async (req, res) => {
  try {
    const models = await Vehicle.find({}, "modelo");
    res.status(200).json(models);
  } catch (error) {
    handleError(error, "vehicle.controller -> getVehicleModels");
    res.status(500).json({ error: "Error al obtener los modelos de vehículos" });
  }
};

async function updateVehicleByModel(req, res) {
  try {
    const { modelName } = req.params;

    const vehicleData = req.body;

    const currentUserEmail = req.email;

    const [updatedVehicle, updateError] = await VehicleService.updateVehicleByModel(modelName, vehicleData, currentUserEmail);

    if (updateError) {
      return respondError(req, res, 403, updateError);
    }

    respondSuccess(req, res, 200, updatedVehicle);
  } catch (error) {
    handleError(error, "vehicle.controller -> updateVehicleByModel");

    respondError(req, res, 500, "Error updating the vehicle");
  }
}

const getVehicleByModel = async (req, res) => {
  try {
    const { modelName } = req.params;

    const vehicle = await Vehicle.findOne({ modelo: modelName });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo vehiculo", error });
  }
};

async function updateVehicle(req, res) {
  try {
    const { vehicleId } = req.params;
    const updates = req.body;

    const [updatedVehicle, updateError] = await VehicleService.updateVehicle(vehicleId, updates);
    if (updateError) {
      return respondError(req, res, 400, updateError);
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
  getVehicleModels,
  updateVehicle,
  getVehicleByModel,
  updateVehicleByModel,
};
