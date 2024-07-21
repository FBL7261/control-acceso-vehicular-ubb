// src/pages/DeleteVehiclePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteVehiclePage = () => {
  const { vehicleId } = useParams(); // ID del vehículo desde la URL
  const navigate = useNavigate(); // Para redireccionar después de la eliminación
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Cargar los datos del vehículo
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`/api/vehicles/${vehicleId}`);
        setVehicle(response.data);
      } catch (err) {
        setError('Error al cargar los datos del vehículo.');
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  // Manejar la eliminación del vehículo
  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      return;
    }

    setIsDeleting(true);

    try {
      await axios.delete(`/api/vehicles/${vehicleId}`);
      navigate('/vehicles'); // Redirigir después de la eliminación
    } catch (err) {
      setError('Error al eliminar el vehículo.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return <p>Eliminando...</p>;
  }

  return (
    <div>
      <h1>Delete Vehicle</h1>
      {error && <p className="error">{error}</p>}
      {vehicle ? (
        <div>
          <p><strong>Matricula:</strong> {vehicle.matricula}</p>
          <p><strong>Modelo:</strong> {vehicle.modelo}</p>
          <p><strong>Marca:</strong> {vehicle.marca}</p>
          <p><strong>Color:</strong> {vehicle.color}</p>
          <button onClick={handleDelete}>Delete Vehicle</button>
        </div>
      ) : (
        <p>Cargando datos del vehículo...</p>
      )}
    </div>
  );
};

export default DeleteVehiclePage;
