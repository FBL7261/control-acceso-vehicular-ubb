import React, { useState } from 'react';
import vehicleService from '../services/vehicle.service';
import Form from '../components/Form';

const CreateVehicle = () => {
  const [formData, setFormData] = useState({
    matricula: '',
    modelo: '',
    marca: '',
    color: '',
    foto: null,
    incluirFoto: false,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] ?? '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value ?? '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.matricula || !formData.modelo || !formData.marca || !formData.color) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'incluirFoto' && value) {
          formDataToSend.append(key, value);
        }
      });

      const [response, error] = await vehicleService.createVehicle(formDataToSend);
      if (error) {
        throw new Error(error);
      }
      alert('Vehículo creado con éxito');
    } catch (error) {
      console.error('Error creando vehículo:', error.response?.data || error.message);
      alert('Hubo un problema al crear el vehículo. Por favor, intente de nuevo.');
    }
  };

  const fields = [
    { label: 'matricula', name: 'matricula', type: 'text', value: formData.matricula },
    { label: 'modelo', name: 'modelo', type: 'text', value: formData.modelo },
    { label: 'marca', name: 'marca', type: 'text', value: formData.marca },
    { label: 'color', name: 'color', type: 'text', value: formData.color },
    { label: 'incluir foto', name: 'incluirFoto', type: 'checkbox', checked: formData.incluirFoto },
    formData.incluirFoto && { label: 'foto', name: 'foto', type: 'file' },
  ].filter(Boolean);

  return (
    <Form
      backgroundColor="#f0f0f0"
      title="Crear Vehículo"
      fields={fields}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
};

export default CreateVehicle;
