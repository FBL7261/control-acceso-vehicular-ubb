import React from 'react';
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
  const navigate = useNavigate();

  // Maneja la navegación para crear un nuevo vehículo
  const handleCreateVehicle = () => {
    navigate('/create-vehicle');
  };

  // Maneja la navegación para ver los vehículos del usuario
  const handleMyVehicles = () => {
    navigate('/my-vehicles'); // Ajusta la ruta según tu configuración
  };

  return (
    <div>
      <h1>Vehículos</h1>
      <button 
        onClick={handleCreateVehicle} 
        style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', margin: '10px 0', border: 'none', borderRadius: '5px' }}
      >
        Crear Vehículo
      </button>
      <button 
        onClick={handleMyVehicles} 
        style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', margin: '10px 0', border: 'none', borderRadius: '5px' }}
      >
        Mis Vehículos
      </button>
      {/* Aquí puedes agregar el resto del contenido de la página */}
    </div>
  );
};

export default Vehicles;

