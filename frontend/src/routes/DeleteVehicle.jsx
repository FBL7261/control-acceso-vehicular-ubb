import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener el servicio adecuado

const DeleteVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    // Aquí podrías cargar los vehículos del usuario actual
    // setVehicles(response.data);
  }, []);

  const handleDelete = async () => {
    try {
      await vehicleService.deleteVehicle(selectedVehicle._id);
      alert('Vehículo eliminado con éxito');
      setVehicles(vehicles.filter(v => v._id !== selectedVehicle._id));
      setSelectedVehicle(null);
    } catch (error) {
      console.error('Error eliminando vehículo:', error);
    }
  };

  return (
    <div>
      <h1>Eliminar Vehículo</h1>
      <select onChange={(e) => setSelectedVehicle(vehicles.find(v => v._id === e.target.value))}>
        {vehicles.map(vehicle => (
          <option key={vehicle._id} value={vehicle._id}>{vehicle.licensePlate}</option>
        ))}
      </select>
      {selectedVehicle && (
        <div>
          <p>¿Estás seguro de que quieres eliminar el vehículo con placa {selectedVehicle.licensePlate}?</p>
          <button onClick={handleDelete}>Eliminar Vehículo</button>
        </div>
      )}
    </div>
  );
};

export default DeleteVehicle;
