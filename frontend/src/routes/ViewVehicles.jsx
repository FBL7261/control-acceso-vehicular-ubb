// frontend/src/routes/ViewVehicles.jsx

import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener un servicio para manejar los vehículos

const ViewVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getAllVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Ver Vehículos</h1>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>
            Placa: {vehicle.licensePlate}, Modelo: {vehicle.model}, Marca: {vehicle.brand}, Color: {vehicle.color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewVehicles;
