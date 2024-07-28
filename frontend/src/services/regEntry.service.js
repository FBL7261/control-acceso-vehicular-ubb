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

export const getRegEntryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getEntriesByFilters = async ({ date, rut, plate }) => {
  try {

    const requests = [];
    if (date) requests.push(axios.get(`${API_URL}/date/${date}`, { headers: { Authorization: `Bearer ${getToken()}` } }));
    if (plate) requests.push(axios.get(`${API_URL}/plate/${plate}`, { headers: { Authorization: `Bearer ${getToken()}` } }));

    const responses = await Promise.all(requests);
    const results = responses.flatMap(response => response.data);

    return results;
  } catch (error) {
    throw error.response.data;
  }
};
