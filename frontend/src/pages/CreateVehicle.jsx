import React from 'react';
import VehicleForm from '../components/VehicleForm';
import vehicleService from '../services/vehicle.service';

const CreateVehicle = () => {
  const handleSubmit = async (vehicleData) => {
    try {
      await vehicleService.createVehicle(vehicleData);
      alert('Vehículo creado con éxito');
    } catch (error) {
      console.error('Error al crear el vehículo:', error);
    }
  };

  return (
    <div>
      <h1>Crear Vehículo</h1>
      <VehicleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateVehicle;
