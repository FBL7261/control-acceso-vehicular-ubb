import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicles'; // Ajusta la URL de tu API según corresponda

export const getVehiclesByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createVehicle = async (newVehicle) => {
  try {
    const response = await axios.post(API_URL, newVehicle);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVehicle = async (id, updatedVehicle) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedVehicle);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
