import axios from './root.service';
import { handleError } from '../utils/errorHandler';

const API_URL = 'http://localhost:3000/api/vehicles'; // Base URL para vehículos

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

    console.log('Enviando solicitud para crear vehículo:', `${API_URL}/`, vehicleData);
    const response = await axios.post(`${API_URL}/`, vehicleData, config);
    console.log('Respuesta al crear vehículo:', response.data);
    return [response.data, null];
  } catch (error) {
    return handleError(error);
  }
};

// Obtener todos los vehículos de un usuario
export const getVehiclesByUserId = async (userId) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(`${API_URL}/user/${userId}`, config);
    return [response.data, null]; // Retorna la lista de vehículos
  } catch (error) {
    return [null, error.response?.data || error.message];
  }
};

// Eliminar un vehículo
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
    return [response.data, null]; // Retorna los datos del vehículo eliminado
  } catch (error) {
    return [null, error.response?.data || error.message];
  }
};

// Actualizar un vehículo
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
    return [response.data, null]; // Retorna los datos del vehículo actualizado
  } catch (error) {
    return [null, error.response?.data || error.message];
  }
};

export default {
  createVehicle,
  getVehiclesByUserId,
  deleteVehicle,
  updateVehicle,
};
