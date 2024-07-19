import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener el servicio adecuado

const ViewVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Aquí podrías cargar los vehículos del usuario actual
    // setVehicles(response.data);
  }, []);

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
