import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service';
import '../styles/VehicleEditor.css'; // Import the new CSS file

const UpdateVehicle = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [formData, setFormData] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: ''
  });

  useEffect(() => {
    // Fetch vehicle models
    const fetchModels = async () => {
      try {
        const response = await vehicleService.getVehicleModels();
        setModels(response);
      } catch (error) {
        console.error('Error obteniendo modelos de vehiculos', error);
      }
    };
    fetchModels();
  }, []);

  const handleModelChange = async (event) => {
    const modelName = event.target.value;
    setSelectedModel(modelName);
    if (!modelName) {
      console.error('Nombre de modelo no es valido');
      return;
    }
    try {
      const response = await vehicleService.getVehicleByModel(modelName);
      setFormData(response);
    } catch (error) {
      console.error(`Error obteniendo datos de vehiculo por modelo ${modelName}`, error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFocus = (event) => {
    const { name } = event.target;
    if (name === 'matricula') {
      console.log('Clearing matricula field'); // Debugging line
      setFormData(prevData => ({ ...prevData, [name]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await vehicleService.updateVehicleByModel(selectedModel, formData);
      alert('Vehiculo actualizado con exito');
    } catch (error) {
      console.error('Error actualizando vehiculo', error);
    }
  };

  return (
    <div className="vehicle-editor-page">
      <a href="/vehicles" className="go-back">←</a>
      <h2>Actualizar vehiculo</h2>
      <select onChange={handleModelChange}>
        <option value="">Seleccionar modelo</option>
        {models.map(model => (
          <option key={model.id} value={model.modelo}>{model.modelo}</option>
        ))}
      </select>

      {selectedModel && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="matricula"
            placeholder="Matricula"
            value={formData.matricula || ''}
            onChange={handleChange}
            onFocus={handleFocus}
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
          <button type="submit">Actualizar vehiculo</button>
        </form>
      )}
    </div>
  );
};

export default UpdateVehicle;