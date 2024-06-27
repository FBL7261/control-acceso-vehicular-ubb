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
      vehicleData.propietario = currentUser._id; // Asignar al usuario autenticado
    }

    const newVehicle = new Vehicle(vehicleData); // Crear el vehículo

    // Guardar el vehículo en la base de datos
    const savedVehicle = await newVehicle.save();

    return [savedVehicle, null]; // Vehículo creado con éxito
  } catch (error) {
    // Manejar el error específico de clave duplicada (matrícula)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.matricula) {
      return [null, "Esta matrícula no está disponible"];
    }
    handleError(error, "vehicle.service -> createVehicle");
    return [null, "Error al crear el vehículo"];
  }
}


// Crear un nuevo vehículo
async function createVehicleWhPhoto(vehicleData, currentUserEmail, isAdmin) {
  try {
    if (!isAdmin) {
      // Si no es administrador, asignar automáticamente al usuario autenticado
      const currentUser = await User.findOne({ email: currentUserEmail });
      if (!currentUser) {
        return [null, "El usuario autenticado no existe"];
      }
      vehicleData.propietario = currentUser._id; // Asignar al usuario autenticado
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

    // Buscar los vehículos cuyo `propietario` coincida con el `ObjectId` del usuario
    const vehicles = await Vehicle.find({ propietario: userId });

    return [vehicles, null]; // Retornar la lista de vehículos
  } catch (error) {
    handleError(error, "vehicle.service -> getVehiclesByUserId");
    return [null, "Error al obtener vehículos del usuario"];
  }
}


async function deleteVehicle(vehicleId, currentUserEmail) {
  try {
    // Validación del ID del vehículo
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return [null, "El ID del vehículo no es válido"];
    }

    // Buscar el vehículo por su ID
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return [null, "El vehículo no existe"];
    }

    // Verificar si el usuario actual es el propietario del vehículo
    const propietario = await User.findById(vehicle.propietario);
    if (!propietario || propietario.email !== currentUserEmail) {
      return [null, "No tienes permiso para eliminar este vehículo"];
    }

    // Eliminar el vehículo
    const vehicleDeleted = await vehicle.remove(); // Eliminar el vehículo de la base de datos

    // Si es necesario, actualizar la lista de vehículos del propietario
    if (propietario) {
      propietario.vehicles.pull(vehicleId); // Quitar el vehículo de la lista del propietario
      await propietario.save(); // Guardar los cambios
    }

    return [vehicleDeleted, null]; // Vehículo eliminado con éxito
  } catch (error) {
    handleError(error, "vehicle.service -> deleteVehicle");
    return [null, "Error al eliminar el vehículo"];
  }
}

// Actualizar un vehículo
async function updateVehicle(vehicleId, vehicleData, currentUserEmail) {
  try {
    // Validar el ID del vehículo
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return [null, "El ID del vehículo no es válido"];
    }

    // Buscar el vehículo por su ID
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return [null, "El vehículo no se encontró"];
    }

    // Verificar si el usuario actual es el propietario del vehículo
    const propietario = await User.findById(vehicle.propietario);
    if (!propietario || propietario.email !== currentUserEmail) {
      return [null, "No tienes permiso para editar este vehículo"];
    }

    // Excluir el campo 'modelo' de los datos de actualización
    const { modelo, ...updateData } = vehicleData;

    // Asignar los datos de actualización al vehículo
    Object.assign(vehicle, updateData);
    await vehicle.save(); // Guardar los cambios en la base de datos

    return [vehicle, null]; // Retornar el vehículo actualizado
  } catch (error) {
    handleError(error, "vehicle.service -> updateVehicle");
    return [null, "Error al actualizar el vehículo"];
  }
}

export default {
  createVehicle,
  createVehicleWhPhoto,
  getVehiclesByUserId,
  deleteVehicle,
  updateVehicle,
};
