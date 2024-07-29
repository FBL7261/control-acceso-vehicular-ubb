import React from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import '../styles/CreateVehicle.css';

const CreateVehicle = () => {
  const navigate = useNavigate();

  const handleVehicleCreated = () => {
    alert('Vehículo creado con éxito!');
  };

  return (
    <div className="create-vehicle-container">
      <a href="/vehicles" className="go-back">←</a>
      <h1>Crear Vehículo</h1>
      <VehicleForm onSubmit={handleVehicleCreated} />
    </div>
  );
};

export default CreateVehicle;