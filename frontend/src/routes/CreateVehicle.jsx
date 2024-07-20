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

  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: ''
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
      setSubmitStatus({
        success: false,
        message: 'Por favor, complete todos los campos requeridos.'
      });
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

      setSubmitStatus({
        success: true,
        message: 'Vehículo creado con éxito.'
      });

      // Limpiar formulario si es necesario
      setFormData({
        matricula: '',
        modelo: '',
        marca: '',
        color: '',
        foto: null,
        incluirFoto: false,
      });

    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Hubo un problema al crear el vehículo. Por favor, intente de nuevo.'
      });
      console.error('Error creando vehículo:', error.response?.data || error.message);
    }
  };

  const fields = [
    { label: 'Matrícula', name: 'matricula', type: 'text', value: formData.matricula },
    { label: 'Modelo', name: 'modelo', type: 'text', value: formData.modelo },
    { label: 'Marca', name: 'marca', type: 'text', value: formData.marca },
    { label: 'Color', name: 'color', type: 'text', value: formData.color },
    { label: 'Incluir foto', name: 'incluirFoto', type: 'checkbox', checked: formData.incluirFoto },
    formData.incluirFoto && { label: 'Foto', name: 'foto', type: 'file' },
  ].filter(Boolean);

  return (
    <div>
      <Form
        backgroundColor="#f0f0f0"
        title="Crear Vehículo"
        fields={fields}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      {submitStatus.message && (
        <div style={{ color: submitStatus.success ? 'green' : 'red' }}>
          {submitStatus.message}
        </div>
      )}
    </div>
  );
};

export default CreateVehicle;
