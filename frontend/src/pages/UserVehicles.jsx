import React, { useEffect, useState } from 'react';
import { getUserVehicles } from '../services/vehicle.service';
import Navbar from '../components/Navbar';

const UserVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getUserVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>Mis Vehículos</h1>
        <ul>
          {vehicles.map(vehicle => (
            <li key={vehicle._id}>{vehicle.marca} - {vehicle.modelo}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserVehicles;
