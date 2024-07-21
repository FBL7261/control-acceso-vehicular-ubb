import axios from 'axios';

const API_URL = 'http://localhost:3000/api/requests';

const getAuthToken = () => sessionStorage.getItem('token');

export const createRequest = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getRequests = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching requests:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getRequestsByUserEmail = async () => {
  try {
    console.log('Iniciando fetch de solicitudes por email de usuario...');
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    console.log('Respuesta del servidor:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching requests by user email:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const updateRequestStatus = async (id, status) => {
  try {
      const response = await axios.put(`${API_URL}/${id}/status`, { status }, {
          headers: {
              'Authorization': `Bearer ${getAuthToken()}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error updating request status:', error.response ? error.response.data : error.message);
      throw error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting request:', error);
    throw error;
  }
};


export default {
  getRequests,
  getRequestsByUserEmail,
  updateRequestStatus,
}