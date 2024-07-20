import axios from './root.service';
import { handleError } from '../utils/errorHandler';

const API_URL = 'http://localhost:3000/api/vehicles'; // URL base para vehículos

// Crear vehículo
export const createVehicle = async (vehicleData) => {
  if (!vehicleData) {
    return [null, 'No se proporcionaron datos para crear el vehículo'];
  }

  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.post(`${API_URL}/`, vehicleData, config);
    return [response.data, null];
  } catch (error) {
    return handleError(error);
  }
};

// Otros métodos
export const getVehiclesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return [response.data, null];
  } catch (error) {
    return handleError(error);
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.delete(`${API_URL}/${vehicleId}`, config);
    return [response.data, null];
  } catch (error) {
    return handleError(error);
  }
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.put(`${API_URL}/${vehicleId}`, vehicleData, config);
    return [response.data, null];
  } catch (error) {
    return handleError(error);
  }
};

export default {
  createVehicle,
  getVehiclesByUserId,
  deleteVehicle,
  updateVehicle,
};
