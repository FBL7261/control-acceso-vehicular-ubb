// src/services/request.service.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/requests';

// Función para obtener el token de autenticación
const getAuthToken = () => {
  return sessionStorage.getItem('token');
};

const createRequest = async (requestData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token de autenticación no disponible');
    }
    console.log("Token de autenticación:", token); // Verificar el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, requestData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
    throw error;
  }
};

const deleteRequest = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token de autenticación no disponible');
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting request:', error);
    throw error;
  }
};

const updateRequest = async (id, requestData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token de autenticación no disponible');
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}/${id}`, requestData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating request:', error);
    throw error;
  }
};

const getRequests = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token de autenticación no disponible');
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
};

const getRequestById = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Token de autenticación no disponible');
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching request by ID:', error);
    throw error;
  }
};

export default {
  createRequest,
  deleteRequest,
  updateRequest,
  getRequests,
  getRequestById,
};
