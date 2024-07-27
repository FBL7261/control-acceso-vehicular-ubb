import React, { useState, useEffect } from 'react';
import axios from 'axios';
import vehicleService from '../services/vehicle.service';

const VehicleEditor = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [formData, setFormData] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: '',
    foto: ''
  });

  useEffect(() => {
    // Obtener los modelos de vehículos del usuario
    const fetchModels = async () => {
      try {
        const response = await vehicleService.getVehicleModels();
        setModels(response);
      } catch (error) {
        console.error('Error al obtener modelos de vehículos', error);
      }
    };
    fetchModels();
  }, []);

  const handleModelChange = async (event) => {
    const modelName = event.target.value;
    setSelectedModel(modelName);
    if (!modelName) {
      console.error('Model name is not valid');
      return;
    }
    try {
      const response = await vehicleService.getVehicleByModel(modelName);
      setFormData(response);
    } catch (error) {
      console.error(`Error al obtener los detalles del vehículo con modelo ${modelName}`, error);
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
          <option key={model.id} value={model.modelo}>{model.modelo}</option>
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

export default VehicleEditor;