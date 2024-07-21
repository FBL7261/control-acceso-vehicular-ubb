// frontend/src/services/vehicle.service.js
import axios from './root.service';

const createVehicle = async (formData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user._id) {
    throw new Error('Usuario no autenticado');
  }

  const response = await axios.post(`/vehicles/user/${user._id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  return response.data;
};

export { createVehicle };