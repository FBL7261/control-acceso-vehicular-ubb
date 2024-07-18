import React, { useEffect, useState } from 'react';
import { getVehiclesByUser } from '../services/vehicle.service';
import VehicleList from '../components/VehicleList';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const userVehicles = await getVehiclesByUser();
      setVehicles(userVehicles);
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Mis Vehículos</h1>
      <VehicleList vehicles={vehicles} />
    </div>
  );
};

export default VehiclesPage;