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

export const updateVehicle = async (vehicleId, vehicleData) => {

  try {

    // Eliminar el campo 'modelo' de los datos de actualización

    const { modelo, ...updateData } = vehicleData;


    const response = await axios.put(`${API_URL}/${vehicleId}`, updateData, {

      headers: {

        'Authorization': `Bearer ${getAuthToken()}`

      },

      withCredentials: true

    });

    return response.data;

  } catch (error) {

    console.error('Error actualizando vehiculo:', error.response ? error.response.data : error.message);

    throw error;

  }

};

export const getVehicleById = async (vehicleId) => {

  try {

    const response = await axios.get(`${API_URL}/${vehicleId}`, {

      headers: {

        'Authorization': `Bearer ${getAuthToken()}`

      },

      withCredentials: true

    });

    return response.data;

  } catch (error) {

    console.error('Error fetching vehicle by ID:', error);

    throw error;

  }

};

export default {
  getUserVehicles,
  createVehicle,
  deleteVehicle,
  updateVehicle,
  getVehicleById
};
