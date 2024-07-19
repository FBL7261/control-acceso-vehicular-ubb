import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener el servicio adecuado

const ViewVehicles = ({ userId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchVehicles = async () => {
      const [data, error] = await vehicleService.getVehiclesByUserId(userId);
      if (error) {
        setError('Error fetching vehicles');
        console.error('Error fetching vehicles:', error);
      } else {
        setVehicles(data);
      }
      setLoading(false);
    };

    fetchVehicles();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (

    <div>

      <h1>Mis Vehículos</h1>

      {vehicles.length === 0 ? (

        <p>No vehicles found.</p>

      ) : (

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
      )}
    </div>
  );
};

export default ViewVehicles;
