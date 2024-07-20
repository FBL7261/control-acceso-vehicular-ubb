
import axios from './root.service';
import { handleError } from '../utils/errorHandler';

const API_URL = 'http://localhost:3000/api/vehicles';// Ajusta esta URL si es necesario

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
