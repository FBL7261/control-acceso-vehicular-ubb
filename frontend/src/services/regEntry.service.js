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

export const getRegEntryByRut = async (rut) => {  
  try {
    const token = getToken();
    if(!token) {
      throw new Error('No hay un token de autenticación');
    }
    const response = await axios.get(`${API_URL}/rut/${rut}`, {
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
    const token = getToken();
    if(!token) {
      throw new Error('No hay un token de autenticación');
    }
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

export const getEntryByDate = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/date/${date}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

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

export const searchEntries = async ({ date, rut, plate }) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay un token de autenticación');
    }
    let endpoint = `${API_URL}/search?`;
    if (date) endpoint += `date=${date}&`;
    if (rut) endpoint += `rut=${rut}&`;
    if (plate) endpoint += `plate=${plate}`;

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};