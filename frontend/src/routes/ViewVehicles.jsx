import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener el servicio adecuado

const ViewVehicles = ({ userId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

   uuseEffect(() => {
    const fetchVehicles = async () => {
      const [data, error] = await vehicleService.getVehiclesByUserId(userId);
      if (error) {
        setError('Error fetching vehicles');
        console.error('Error fetching vehicles:', error);
      } else {
        setVehicles(data);
      }
    };

    fetchVehicles();
  }, [userId]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Mis Vehículos</h1>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle._id}>
            <p>Placa: {vehicle.licensePlate}</p>
            <p>Modelo: {vehicle.model}</p>
            <p>Marca: {vehicle.brand}</p>
            <p>Color: {vehicle.color}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewVehicles;
