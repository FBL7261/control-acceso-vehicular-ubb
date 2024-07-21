// src/pages/UpdateVehiclePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateVehiclePage = () => {
  const { vehicleId } = useParams(); // ID del vehículo desde la URL
  const navigate = useNavigate(); // Para redireccionar después de la actualización
  const [vehicle, setVehicle] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`/api/vehicles/${vehicleId}`, vehicle);
      navigate(`/vehicles/${vehicleId}`); // Redirigir después de la actualización
    } catch (err) {
      setError('Error al actualizar el vehículo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Update Vehicle</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="matricula">Matricula:</label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            value={vehicle.matricula}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={vehicle.modelo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={vehicle.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={vehicle.color}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default UpdateVehiclePage;
