// frontend/src/components/CreateVehicle.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../services/vehicle.service';

const CreateVehicle = () => {
  const [formData, setFormData] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: '',
    foto: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await createVehicle(formDataToSend);
      navigate('/my-vehicles');
    } catch (error) {
      setError(`Error al crear el vehículo: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Crear Vehículo</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="matricula" value={formData.matricula} onChange={handleChange} placeholder="Matrícula" required />
        <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo" required />
        <input type="text" name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca" required />
        <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" required />
        <input type="file" name="foto" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Vehículo'}
        </button>
      </form>
    </div>
  );
};

export default CreateVehicle;