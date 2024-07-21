import React from 'react';
import VehicleForm from '../components/VehicleForm';

const CreateVehicle = () => {
  const handleVehicleCreated = () => {
    // Redirigir o mostrar un mensaje de éxito
    alert('Vehículo creado con éxito!');
  };

  return (
    <div>
      <h1>Crear Vehículo</h1>
      <VehicleForm onSubmit={handleVehicleCreated} />
    </div>
  );
};

export default CreateVehicle;
