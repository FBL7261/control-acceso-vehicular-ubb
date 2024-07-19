import React, { useState } from 'react';
import vehicleService from '../services/vehicle.service';
import Form from '../components/Form';

const CreateVehicle = () => {
  const [formData, setFormData] = useState({
    licensePlate: '',
    model: '',
    brand: '',
    color: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      await vehicleService.createVehicle(formDataToSend);
      alert('Vehículo creado con éxito');
    } catch (error) {
      console.error('Error creando vehículo:', error);
    }
  };

  const fields = [
    { label: 'Placa', name: 'licensePlate', type: 'text', value: formData.licensePlate },
    { label: 'Modelo', name: 'model', type: 'text', value: formData.model },
    { label: 'Marca', name: 'brand', type: 'text', value: formData.brand },
    { label: 'Color', name: 'color', type: 'text', value: formData.color },
    { label: 'Foto', name: 'photo', type: 'file' },
  ];

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
