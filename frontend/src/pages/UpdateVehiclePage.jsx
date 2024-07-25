import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VehicleSelect from '../components/VehicleSelect';
import { getUserVehicles } from '../services/vehicle.service';
import '../styles/UpdateVehiclePage.css'; // Import the CSS file

const UpdateVehiclePage = () => {
  const navigate = useNavigate(); // Para redireccionar después de la actualización
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [vehicle, setVehicle] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: '',
    foto: null,
  });
  const [originalVehicle, setOriginalVehicle] = useState(null);
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
        setOriginalVehicle(response.data);
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

  // Manejar cambios en el archivo de foto
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVehicle((prevVehicle) => ({
        ...prevVehicle,
        foto: file,
      }));
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('matricula', vehicle.matricula);
      formData.append('modelo', vehicle.modelo);
      formData.append('marca', vehicle.marca);
      formData.append('color', vehicle.color);
      if (vehicle.foto) {
        formData.append('foto', vehicle.foto);
      }

      await axios.put(`/api/vehicles/${selectedVehicleId}`, formData, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      navigate(`/vehicles/${selectedVehicleId}`); // Redirigir después de la actualización
    } catch (err) {
      setError('Error al actualizar el vehículo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-vehicle-page">
      <h1>Actualizar Vehículo</h1>
      {error && <p className="error">{error}</p>}
      <VehicleSelect vehicles={vehicles} onSelect={setSelectedVehicleId} />
      {selectedVehicleId && (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="matricula">Matrícula:</label>
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
                disabled
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
            <div>
              <label htmlFor="foto">Foto:</label>
              <input
                type="file"
                id="foto"
                name="foto"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Actualizando...' : 'Actualizar Vehículo'}
            </button>
          </form>
          {originalVehicle && (
            <div className="vehicle-details">
              {originalVehicle.foto && (
                <img
                  src={`http://localhost:3000/${originalVehicle.foto}`}
                  alt={`${originalVehicle.marca} ${originalVehicle.modelo}`}
                />
              )}
              <p><strong>Matrícula:</strong> {originalVehicle.matricula}</p>
              <p><strong>Modelo:</strong> {originalVehicle.modelo}</p>
              <p><strong>Marca:</strong> {originalVehicle.marca}</p>
              <p><strong>Color:</strong> {originalVehicle.color}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateVehiclePage;