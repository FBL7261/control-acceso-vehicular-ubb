import axios from "axios";

const API_URL = 'http://localhost:3000/api/regEntry';

const getToken = () => sessionStorage.getItem('token');

export const createRegEntry = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createRegEntryUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/user`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
    } catch (error) {
    throw error.response.data;
    }
};

export const getRegEntry = async () => {
  try {
    const token = getToken();
    if(!token) {
      throw new Error('No hay un token de autenticación');
    }
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los registros de entrada:', error);
    throw error.response ? error.response.data : new Error('Error en la solicitud');
  }
};

export const getRegEntryByPlate = async (plate) => {
  try {
    const response = await axios.get(`${API_URL}/plate/${plate}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};