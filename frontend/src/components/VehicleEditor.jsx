import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service';
import '../styles/VehicleEditor.css'; // Ensure you import the CSS file

const VehicleEditor = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [formData, setFormData] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: '',
    foto: ''
  });

  useEffect(() => {
    vehicleService.getModels().then(response => {
      setModels(response.data);
    });
  }, []);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    vehicleService.updateVehicle(formData).then(response => {
      console.log('Vehicle updated:', response.data);
    });
  };

  return (
    <div className="vehicle-editor-page">
      <a href="/vehicles" className="go-back">←</a>
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