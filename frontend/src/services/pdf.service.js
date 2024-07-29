import axios from 'axios';
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/pdf`;


const getAuthToken = () => sessionStorage.getItem('token');

export const uploadPDF = async (file, requestId) => {
  try {
    const formData = new FormData();
    formData.append('pdf', file);
    const response = await axios.post(`${API_URL}/${requestId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getPDFsForRequest = async (requestId) => {
  try {
    const response = await axios.get(`${API_URL}/request/${requestId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    throw error;
  }
};

export const deletePDF = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting PDF:', error);
    throw error;
  }
};

export default { 
    uploadPDF, 
    getPDFsForRequest, 
    deletePDF 
};
