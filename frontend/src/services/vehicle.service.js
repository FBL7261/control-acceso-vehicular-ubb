import axios from './root.service'; // Asegúrate de importar axios desde la configuración correcta

export const getUserVehicles = async () => {
  try {
    const response = await axios.get('/api/vehicles');
    return response.data;
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    throw error;
  }
};

// Agregar la función para crear un vehículo
export const createVehicle = async (vehicleData) => {
  try {
    const formData = new FormData();
    for (const key in vehicleData) {
      formData.append(key, vehicleData[key]);
    }
    const response = await axios.post('/api/vehicles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error;
  }
};

export default {
  getUserVehicles,
  createVehicle,
};
