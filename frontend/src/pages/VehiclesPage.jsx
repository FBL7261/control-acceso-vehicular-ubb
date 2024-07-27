import React from 'react';
import { useNavigate } from 'react-router-dom';

function VehiclesPage() {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="vehicles-page">
      <h1>Vehículos</h1>
      <div className="button-container">
        <button 
          className="button-green" 
          onClick={() => handleRedirect('/vehicles/create-vehicle')}
        >
          Registrar vehículo
        </button>
        <button 
          className="button-green" 
          onClick={() => handleRedirect('/vehicles/my-vehicles')}
        >
          Mis vehículos
        </button>
        <button 
          className="button-green" 
          onClick={() => handleRedirect('/vehicles/update-vehicle')}
        >
          Actualizar información vehículo
        </button>
        <button 
          className="button-green" 
          onClick={() => handleRedirect('/vehicles/delete-vehicle')}
        >
          Eliminar Vehículo
        </button>
      </div>
    </div>
  );
}

export default VehiclesPage;