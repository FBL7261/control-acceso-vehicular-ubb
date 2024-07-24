import React, { useEffect, useState } from 'react';
import { getUserVehicles } from '../services/vehicle.service';

const UserVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
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

  return (
    <div>
      <h1>Mis Vehículos</h1>
      {vehicles.length === 0 ? (
        <p>Actualmente no posees vehículos registrados</p>
      ) : (
        <ul>
          {vehicles.map(vehicle => (
            <li key={vehicle._id}>
              <p>Matrícula: {vehicle.matricula}</p>
              <p>Modelo: {vehicle.modelo}</p>
              <p>Marca: {vehicle.marca}</p>
              <p>Color: {vehicle.color}</p>
              {vehicle.foto && <img src={`http://localhost:3000/${vehicle.foto}`} alt={`${vehicle.marca} ${vehicle.modelo}`} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserVehicles;