import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateVehicleForm from './UpdateVehicleForm';

const UpdateVehicleWrapper = () => {
  const { id } = useParams(); // Assuming you're using react-router for routing
  const [vehicleId, setVehicleId] = useState(null);

  useEffect(() => {
    if (id) {
      setVehicleId(id);
    }
  }, [id]);

  return vehicleId ? <UpdateVehicleForm vehicleId={vehicleId} /> : <p>Loading...</p>;
};

export default UpdateVehicleWrapper;