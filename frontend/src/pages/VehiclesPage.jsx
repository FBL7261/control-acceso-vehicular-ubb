// vehicles/VehiclesPage.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehiclesByUser, deleteVehicle } from '../services/vehicle.service';
import VehicleCard from '../components/VehicleCard';


const VehiclesPage = ({ user }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehiclesByUser(user.id);
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);
      // Update state after deletion
      const updatedVehicles = vehicles.filter((vehicle) => vehicle._id !== id);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="table-container">
        <h1>Mis Vehículos</h1>
        {vehicles.length > 0 ? (
          <table id="users">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Foto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  onDelete={() => handleDeleteVehicle(vehicle._id)}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No hay vehículos registrados.</p>
        )}
        <Link to="/vehicles/add">Agregar Vehículo</Link>
      </div>
    </div>
  );
};

export default VehiclesPage;
