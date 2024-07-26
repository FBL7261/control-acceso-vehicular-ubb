import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service';
import '../styles/UpdateVehicleForm.css';

const UpdateVehicleForm = ({ vehicleId, onSubmit }) => {
  const [vehicle, setVehicle] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: '',
    foto: null,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleData = await vehicleService.getVehicleById(vehicleId);
        setVehicle(vehicleData);
      } catch (err) {
        setError('Error al cargar los datos del vehículo.');
      }
    };

    if (vehicleId) {
      fetchVehicle();
    }
  }, [vehicleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVehicle((prevVehicle) => ({
        ...prevVehicle,
        foto: file,
      }));
    }
  };

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

      await vehicleService.updateVehicle(vehicleId, formData);

      if (onSubmit) onSubmit();
    } catch (err) {
      setError('Error al actualizar el vehículo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-vehicle-form">
      <h2>Actualizar Vehículo</h2>
      {error && <p className="error">{error}</p>}
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
    </div>
  );
};

export default UpdateVehicleForm;