import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicles'; // Ajusta la URL de tu API según corresponda

export const getVehiclesByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const createVehicle = async (newVehicle) => {
  const response = await axios.post(API_URL, newVehicle);
  return response.data;
};

export const updateVehicle = async (id, updatedVehicle) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedVehicle);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
