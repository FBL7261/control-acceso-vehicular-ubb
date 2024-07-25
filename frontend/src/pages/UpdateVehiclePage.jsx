import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VehicleSelect from '../components/VehicleSelect';
import { getUserVehicles } from '../services/vehicle.service';

const UpdateVehiclePage = () => {
  const navigate = useNavigate(); // Para redireccionar después de la actualización
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [vehicle, setVehicle] = useState({
    matricula: '',
    marca: '',
    color: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar la lista de vehículos
  useEffect(() => {
    const fetchVehicles = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) return;
      try {
        const response = await getUserVehicles(userId);
        setVehicles(response.data);
      } catch (err) {
        setError('Error al cargar la lista de vehículos.');
      }
    };

    fetchVehicles();
  }, []);

  // Cargar los datos del vehículo seleccionado
  useEffect(() => {
    if (!selectedVehicleId) return;

    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`/api/vehicles/${selectedVehicleId}`);
        setVehicle(response.data);
      } catch (err) {
        setError('Error al cargar los datos del vehículo.');
      }
    };

    fetchVehicle();
  }, [selectedVehicleId]);

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
      await axios.put(`/api/vehicles/${selectedVehicleId}`, vehicle, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        withCredentials: true
      });
      navigate(`/vehicles/${selectedVehicleId}`); // Redirigir después de la actualización
    } catch (err) {
      setError('Error al actualizar el vehículo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Actualizar Vehiculo</h1>
      {error && <p className="error">{error}</p>}
      <VehicleSelect vehicles={vehicles} onSelect={setSelectedVehicleId} />
      {selectedVehicleId && (
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
            <label htmlFor="marca">Marca:</label>
            <input
            disabled
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
            placeholder='Color Auto'
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
      )}
    </div>
  );
};

export default UpdateVehiclePage;