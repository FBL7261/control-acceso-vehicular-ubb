// frontend/src/routes/CreateVehicle.jsx

import React, { useState } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener un servicio para manejar los vehículos

const CreateVehicle = () => {
  const [formData, setFormData] = useState({
    licensePlate: '',
    model: '',
    brand: '',
    color: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      await vehicleService.createVehicle(formDataToSend);
      alert('Vehículo creado con éxito');
    } catch (error) {
      console.error('Error creando vehículo:', error);
    }
  };

  return (
    <div>
      <h1>Crear Vehículo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Placa:
          <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required />
        </label>
        <label>
          Modelo:
          <input type="text" name="model" value={formData.model} onChange={handleChange} required />
        </label>
        <label>
          Marca:
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
        </label>
        <label>
          Color:
          <input type="text" name="color" value={formData.color} onChange={handleChange} required />
        </label>
        <label>
          Foto:
          <input type="file" name="photo" onChange={handleChange} />
        </label>
        <button type="submit">Crear Vehículo</button>
      </form>
    </div>
  );
};

export default CreateVehicle;
