import axios from 'axios';

export const getUserVehicles = async () => {
  try {
    const response = await axios.get('/api/vehicles');
    return response.data;
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    throw error;
  }
};
