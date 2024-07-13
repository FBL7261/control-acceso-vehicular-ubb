// src/services/vehicle.service.js
import axios from './root.service.js';

export async function getVehiclesByUser(userId) {
  try {
    const { data } = await axios.get(`/vehicle/user/${userId}`);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function createVehicle(vehicleData) {
  try {
    const { data } = await axios.post('/vehicle', vehicleData);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function updateVehicle(vehicleId, vehicleData) {
  try {
    const { data } = await axios.put(`/vehicle/${vehicleId}`, vehicleData);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function deleteVehicle(vehicleId) {
  try {
    const { data } = await axios.delete(`/vehicle/${vehicleId}`);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
