// frontend/src/routes/DeleteVehicle.jsx

import React, { useState } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener un servicio para manejar los vehículos

const DeleteVehicle = () => {
  const [licensePlate, setLicensePlate] = useState('');

  const handleChange = (e) => {
    setLicensePlate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await vehicleService.deleteVehicle(licensePlate);
      alert('Vehículo eliminado con éxito');
    } catch (error) {
      console.error('Error eliminando vehículo:', error);
    }
  };

  return (
    <div>
      <h1>Eliminar Vehículo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Placa del Vehículo:
          <input type="text" value={licensePlate} onChange={handleChange} required />
        </label>
        <button type="submit">Eliminar Vehículo</button>
      </form>
    </div>
  );
};

export default DeleteVehicle;
