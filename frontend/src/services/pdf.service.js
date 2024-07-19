// src/services/pdf.service.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pdf';

const createPDF = async (file, id) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating PDF:', error);
    throw error;
  }
};

const getPDF = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching PDF:', error);
    throw error;
  }
};

const getPDFsForPerson = async (personId) => {
  try {
    const response = await axios.get(`${API_URL}/person/${personId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching PDFs for person:', error);
    throw error;
  }
};

const deletePDF = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting PDF:', error);
    throw error;
  }
};

export default {
  createPDF,
  getPDF,
  getPDFsForPerson,
  deletePDF,
};
