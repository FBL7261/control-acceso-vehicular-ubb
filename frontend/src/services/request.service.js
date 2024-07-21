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
    return response;  // Devolver la respuesta completa
  } catch (error) {
    console.error('Error fetching requests:', error.response ? error.response.data : error.message);
    throw error;
  }
};


const getRequestsByEmail = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching requests by email:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateRequest = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating request:', error);
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
  getRequestsByEmail,
}