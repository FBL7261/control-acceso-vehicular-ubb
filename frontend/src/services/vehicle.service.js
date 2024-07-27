import axios from 'axios';

const API_URL = 'http://localhost:3000/api/vehicles';

const getAuthToken = () => sessionStorage.getItem('token');

export const getUserVehicles = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    throw error;
  }
};

export const getVehicleModels = async () => {
  try {
    const response = await axios.get(`${API_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    throw error;
  }
};

// Nueva función para actualizar los detalles de un vehículo
export const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const response = await axios.put(`${API_URL}/${vehicleId}`, vehicleData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error actualizando vehículo:', error);
    throw error;
  }
};

export const createVehicle = async (vehicleData) => {
  try {
    const formData = new FormData();
    for (const key in vehicleData) {
      formData.append(key, vehicleData[key]);
    }
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creando vehiculo:', error.response ? error.response.data : error.message);
    throw error;
  }


};

export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await axios.delete(`${API_URL}/${vehicleId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error eliminando vehiculo:', error);
    throw error;
  }
};
const getVehicle = async (vehicleId) => {
  try {
    const response = await axios.get(`${API_URL}/${vehicleId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      withCredentials: true // Asegúrate de que esto esté habilitado si tu API lo requiere
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }
};



export default {
  getUserVehicles,
  createVehicle,
  deleteVehicle,
  getVehicleModels,
  updateVehicle,
  getVehicle
};
