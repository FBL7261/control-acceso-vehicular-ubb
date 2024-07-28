import React, { useState, useEffect } from 'react';
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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdFromSession = sessionStorage.getItem('userId');
    setUserId(userIdFromSession);
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (!userId) return;
      try {
        const response = await vehicleService.getUserVehicles(userId);
        setModels(response.data); // Ensure response.data is used if the response is wrapped in a data object
      } catch (error) {
        console.error('Error al obtener modelos de vehículos', error);
      }
    };
    fetchModels();
  }, [userId]);

  const handleModelChange = async (event) => {
    const modelName = event.target.value;
    setSelectedModel(modelName);
    if (!modelName) {
      console.error('Model name is not valid');
      return;
    }
    try {
      const response = await vehicleService.getVehicleByModel(modelName);
      setFormData(response.data); // Ensure response.data is used if the response is wrapped in a data object
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
      await vehicleService.updateVehicleByModel(selectedModel, formData);
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
          <option key={model._id} value={model.modelo}>{model.modelo}</option>
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