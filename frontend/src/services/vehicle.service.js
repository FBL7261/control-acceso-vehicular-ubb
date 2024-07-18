import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicles';

export const getVehiclesByUser = async () => {
  const response = await axios.get(`${API_URL}/user`);
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const formData = new FormData();
  for (const key in vehicleData) {
    formData.append(key, vehicleData[key]);
  }
  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await axios.put(`${API_URL}/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};