// frontend/src/components/VehicleList.jsx
import React, { useEffect, useState } from 'react';
import { getVehiclesByUser, deleteVehicle } from '../services/vehicle.service';

function VehicleList({ userId }) {
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const data = await getVehiclesByUser(userId);
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }
    fetchVehicles();
  }, [userId]);
  
  const handleDelete = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId);
      setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };
  
  return (
    <div>
      <h2>Mis Vehículos</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle._id}>
            {vehicle.marca} - {vehicle.matricula}
            <button onClick={() => handleDelete(vehicle._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehicleList;
