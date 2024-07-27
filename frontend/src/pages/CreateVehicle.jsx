import React from 'react';
import VehicleForm from '../components/VehicleForm';
import '../styles/CreateVehicle.css'; // Asegúrate de que la ruta sea correcta

const CreateVehicle = () => {
  const handleVehicleCreated = () => {
    // Redirigir o mostrar un mensaje de éxito
    alert('Vehículo creado con éxito!');
  };

  return (
    <div className="create-vehicle-container">
      <h1>Crear Vehículo</h1>
      <VehicleForm onSubmit={handleVehicleCreated} />
    </div>
  );
};

export default CreateVehicle;
