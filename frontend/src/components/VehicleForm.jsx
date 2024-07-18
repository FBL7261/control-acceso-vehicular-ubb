// frontend/src/components/VehicleForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function VehicleForm({ userId, onVehicleCreated }) {
  const [marca, setMarca] = useState('');
  const [matricula, setMatricula] = useState('');
  const [color, setColor] = useState('');
  const [modelo, setModelo] = useState('');
  const [foto, setFoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('marca', marca);
    formData.append('matricula', matricula);
    formData.append('color', color);
    formData.append('modelo', modelo);
    formData.append('userId', userId);
    if (foto) {
      formData.append('foto', foto);
    }

    try {
      const { data } = await axios.post('/api/vehicles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Vehículo creado con éxito');
      if (onVehicleCreated) {
        onVehicleCreated(data);
      }
    } catch (error) {
      console.error('Error creando el vehículo', error);
      alert('Error creando el vehículo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Marca:</label>
        <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
      </div>
      <div>
        <label>Matricula:</label>
        <input type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
      </div>
      <div>
        <label>Color:</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div>
        <label>Modelo:</label>
        <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
      </div>
      <div>
        <label>Foto:</label>
        <input type="file" onChange={(e) => setFoto(e.target.files[0])} />
      </div>
      <button type="submit">Crear Vehículo</button>
    </form>
  );
}

export default VehicleForm;