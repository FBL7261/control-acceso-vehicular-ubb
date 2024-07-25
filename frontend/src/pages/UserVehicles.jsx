import React, { useEffect, useState } from 'react';
import { getUserVehicles } from '../services/vehicle.service';
import '../styles/UserVehicles.css'; // Import the CSS file

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
    <div className="user-vehicles-page">
      <h1>Mis Vehículos</h1>
      {vehicles.length === 0 ? (
        <p>Actualmente no posees vehículos registrados</p>
      ) : (
        <div className="vehicle-grid">
          {vehicles.map(vehicle => (
            <div key={vehicle._id} className="vehicle-card">
              {vehicle.foto && <img src={`http://localhost:3000/${vehicle.foto}`} alt={`${vehicle.marca} ${vehicle.modelo}`} />}
              <p><strong>Matrícula:</strong> {vehicle.matricula}</p>
              <p><strong>Modelo:</strong> {vehicle.modelo}</p>
              <p><strong>Marca:</strong> {vehicle.marca}</p>
              <p><strong>Color:</strong> {vehicle.color}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserVehicles;