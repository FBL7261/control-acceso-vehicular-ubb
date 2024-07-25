import React, { useEffect, useState } from 'react';
import { getUserVehicles } from '../services/vehicle.service';
import VehicleSelect from '../components/VehicleSelect';

const UserVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdFromSession = sessionStorage.getItem('userId');
    console.log('User ID from session:', userIdFromSession); // Debug log
    setUserId(userIdFromSession);
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!userId) return;
      try {
        const response = await getUserVehicles(userId);
        console.log('Fetched vehicles:', response); // Debug log
        setVehicles(response.data); // Access the data property
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    };

    fetchVehicles();
  }, [userId]);

  const handleSelect = (vehicleId) => {
    const vehicle = vehicles.find(v => v._id === vehicleId);
    setSelectedVehicle(vehicle);
  };

  return (
    <div>
      <h1>Mis Vehículos</h1>
      <VehicleSelect vehicles={vehicles} onSelect={handleSelect} />
      {selectedVehicle ? (
        <div>
          <h2>Información del Vehículo</h2>
          <p>Matrícula: {selectedVehicle.matricula}</p>
          <p>Modelo: {selectedVehicle.modelo}</p>
          <p>Marca: {selectedVehicle.marca}</p>
          <p>Color: {selectedVehicle.color}</p>
          {selectedVehicle.foto && (
            <img
              src={`http://localhost:3000/${selectedVehicle.foto}`}
              alt={`${selectedVehicle.marca} ${selectedVehicle.modelo}`}
            />
          )}
        </div>
      ) : (
        <p>Selecciona una matrícula para ver la información del vehículo.</p>
      )}
    </div>
  );
};

export default UserVehicles;