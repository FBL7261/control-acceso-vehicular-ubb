import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service';
import { useAuth } from '../context/AuthContext';

const UpdateVehicle = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [formData, setFormData] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: '',
    foto: ''
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const modelsData = await vehicleService.getVehicleModels();
        setModels(modelsData);
      } catch (error) {
        console.error('Error al obtener modelos de vehículos', error);
      }
    };
    fetchModels();
  }, []);

  const handleModelChange = async (event) => {
    const vehicleId = event.target.value;
    setSelectedModel(vehicleId);
    try {
      const response = await vehicleService.getVehicle(vehicleId);
      setFormData(response);
    } catch (error) {
      console.error('Error al obtener los detalles del vehículo', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await vehicleService.updateVehicle(selectedModel, formData);
      alert('Vehículo actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el vehículo', error);
    }
  };

  return (
    <div>
      <h2>Editar Vehículo</h2>
      <select onChange={handleModelChange}>
        <option value="">Selecciona un modelo</option>
        {models.map(model => (
          <option key={model.id} value={model.id}>{model.modelo}</option>
        ))}
      </select>

      {selectedModel && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={formData.marca || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="foto"
            placeholder="URL de la foto"
            value={formData.foto || ''}
            onChange={handleChange}
          />
          <button type="submit">Actualizar Vehículo</button>
        </form>
      )}
    </div>
  );
};

export default UpdateVehicle;
