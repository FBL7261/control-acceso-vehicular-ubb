import axios from "axios";

const API_URL = 'http://localhost:3000/api/regEntry';

const getToken = () => sessionStorage.getItem('token');

export const createRegEntry = async (data) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay un token de autenticación');
    }
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
    const token = getToken();
    if (!token) {
      throw new Error('No hay un token de autenticación');
    }
    const response = await axios.post(`${API_URL}/regEntryUser`, data, {
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
    throw error.response.data;
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


export const deleteRegEntry = async (id) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay un token de autenticación');
    }
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};