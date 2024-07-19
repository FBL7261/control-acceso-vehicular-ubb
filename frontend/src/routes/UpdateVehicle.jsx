// frontend/src/routes/UpdateVehicle.jsx

import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener un servicio para manejar los vehículos
import { useParams } from 'react-router-dom';

const UpdateVehicle = () => {
  const { id } = useParams(); // Asume que recibes el ID del vehículo en la URL
  const [vehicle, setVehicle] = useState({
    licensePlate: '',
    model: '',
    brand: '',
    color: '',
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await vehicleService.getVehicleById(id);
        setVehicle(data);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await vehicleService.updateVehicle(id, vehicle);
      alert('Vehículo actualizado con éxito');
    } catch (error) {
      console.error('Error actualizando vehículo:', error);
    }
  };

  return (
    <div>
      <h1>Actualizar Vehículo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Placa:
          <input type="text" name="licensePlate" value={vehicle.licensePlate} onChange={handleChange} required />
        </label>
        <label>
          Modelo:
          <input type="text" name="model" value={vehicle.model} onChange={handleChange} required />
        </label>
        <label>
          Marca:
          <input type="text" name="brand" value={vehicle.brand} onChange={handleChange} required />
        </label>
        <label>
          Color:
          <input type="text" name="color" value={vehicle.color} onChange={handleChange} required />
        </label>
        <button type="submit">Actualizar Vehículo</button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
