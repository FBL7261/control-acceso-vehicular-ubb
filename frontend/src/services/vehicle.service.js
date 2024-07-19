import axios from 'axios';

const API_URL = '/api/vehicles'; // Ajusta esta URL si es necesario

// Crear un nuevo vehículo
const createVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, vehicleData);
    return [response.data, null]; // Retorna los datos del vehículo creado
  } catch (error) {
    return [null, error.response?.data || error.message];
  }
};

// Obtener todos los vehículos de un usuario
const getVehiclesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return [response.data, null]; // Retorna la lista de vehículos
  } catch (error) {
    return [null, error.response?.data || error.message];
  }
};

// Eliminar un vehículo
const deleteVehicle = async (vehicleId) => {
  try {
    const response = await axios.delete(`${API_URL}/${vehicleId}`);
    return [response.data, null]; // Retorna los datos del vehículo eliminado
  } catch (error) {
    return [null, error.response?.data || error.message];
  }
};

// Actualizar un vehículo
const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const response = await axios.put(`${API_URL}/${vehicleId}`, vehicleData);
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
