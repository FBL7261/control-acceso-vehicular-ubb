import React from 'react';
import VehicleForm from '../components/VehicleForm';
import { createVehicle } from '../services/vehicle.service';

const AddVehiclePage = () => {
  const handleSubmit = async (vehicleData) => {
    await createVehicle(vehicleData);
    // Redirigir o actualizar la lista de vehículos
  };

  return (
    <div>
      <h1>Agregar Nuevo Vehículo</h1>
      <VehicleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddVehiclePage;