// request.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/requests';
const PDF_API_URL = 'http://localhost:3000/api/pdf';

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

export const getRequestsByUserEmail = async () => {
  try {
    console.log('Iniciando fetch de solicitudes por email de usuario...');
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    console.log('Respuesta del servidor:', response.data);
    return response.data.data; // Devolver directamente el array de solicitudes
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
    // Obtener PDFs asociados
    const pdfsResponse = await axios.get(`${PDF_API_URL}/request/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    const pdfs = pdfsResponse.data;

    // Eliminar cada PDF asociado
    for (const pdf of pdfs) {
      await axios.delete(`${PDF_API_URL}/${pdf._id}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
    }

    // Eliminar la solicitud
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

const getRequestById = async (id) => {
  try {
    console.log('Iniciando fetch de solicitud por ID...');
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    console.log('Solicitud recibida:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching request by id:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateRequest = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getPDFsByRequestId = async (requestId) => {
  try {
      const response = await axios.get(`${API_URL}/pdfs/${requestId}`, {
          headers: {
              'Authorization': `Bearer ${getAuthToken()}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching PDFs by request id:', error.response ? error.response.data : error.message);
      throw error;
  }
};


export default {
  getRequests,
  getRequestsByUserEmail,
  updateRequestStatus,
  deleteRequest,
  updateRequest,
  getRequestById,
  getPDFsByRequestId,
};
