// vehicles/AddVehiclePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Cambio de importación
import { createVehicle } from '../services/vehicle.service';

const AddVehiclePage = ({ user }) => {
  const navigate = useNavigate();  // Cambio aquí

  const [patent, setPatent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('patent', patent);
      if (photo) {
        formData.append('photo', photo);
      }
      await createVehicle(formData);
      navigate('/vehicles');  // Cambio aquí
    } catch (error) {
      setErrorMessage('Error al agregar vehículo. Inténtalo nuevamente.');
      console.error('Error adding vehicle:', error);
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Agregar Vehículo</h1>
        <form onSubmit={handleSubmit}>
          <label>Patente:</label>
          <input
            type="text"
            value={patent}
            onChange={(e) => setPatent(e.target.value)}
            required
          />
          <label>Subir Foto (opcional):</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit">Agregar Vehículo</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddVehiclePage;
