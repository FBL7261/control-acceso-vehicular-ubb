import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../services/vehicleService';

const CreateVehicleForm = ({ userId, reloadVehicles }) => {
  const [formData, setFormData] = useState({
    plateNumber: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { plateNumber, photo } = formData;
    const newVehicle = {
      plateNumber,
      photo,
      userId,
    };

    try {
      await createVehicle(newVehicle);
      reloadVehicles(); // Actualizar la lista de vehículos después de crear uno nuevo
      setFormData({ plateNumber: '', photo: null });
    } catch (error) {
      console.error('Error al crear el vehículo:', error);
    }
  };

  return (
    <div className="form">
      <h1>Registro de Vehículo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="plateNumber">Patente:</label>
        <input
          type="text"
          id="plateNumber"
          name="plateNumber"
          value={formData.plateNumber}
          onChange={handleChange}
          required
        />
        <label htmlFor="photo">Subir foto (opcional):</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">Registrar Vehículo</button>
      </form>
    </div>
  );
};

export default CreateVehicleForm;
