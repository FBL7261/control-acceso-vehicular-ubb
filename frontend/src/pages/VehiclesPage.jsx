import React, { useEffect, useState } from 'react';
import { getVehiclesByUser } from '../services/vehicle.service';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Obtén el userId del usuario autenticado, por ejemplo, desde sessionStorage o el contexto de autenticación
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
    </div>
  );
};

export default VehiclesPage;
