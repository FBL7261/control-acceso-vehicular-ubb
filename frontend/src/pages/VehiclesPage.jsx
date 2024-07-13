import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVehiclesByUser } from '../services/vehicle.service';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
        const userId = storedUser?.data?.userId;

        if (userId) {
          const response = await getVehiclesByUser(userId);
          setVehicles(response);
        } else {
          console.error('Usuario no autenticado');
        }
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleCreateVehicle = () => {
    navigate('/create-vehicle');
  };

  const handleEditVehicle = () => {
    navigate('/update-vehicle'); // Asegúrate de que la ruta exista
  };

  const handleDeleteVehicle = () => {
    navigate('/delete-vehicle'); // Asegúrate de que la ruta exista
  };

  const handleViewVehicles = () => {
    navigate('/vehicles'); // Asegúrate de que la ruta exista
  };

  return (
    <div>
      <h1>Vehículos</h1>
      {vehicles.length > 0 ? (
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              {vehicle.make} {vehicle.model} - {vehicle.plate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay vehículos registrados.</p>
      )}
      <div style={buttonContainerStyle}>
        <button onClick={handleCreateVehicle} style={buttonStyle}>Crear vehículo</button>
        <button onClick={handleEditVehicle} style={buttonStyle}>Editar información de vehículo</button>
        <button onClick={handleDeleteVehicle} style={buttonStyle}>Eliminar vehículo</button>
        <button onClick={handleViewVehicles} style={buttonStyle}>Ver vehículos</button>
      </div>
    </div>
  );
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '20px'
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default VehiclesPage;
