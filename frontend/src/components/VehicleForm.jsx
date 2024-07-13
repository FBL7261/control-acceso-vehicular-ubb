// frontend/src/components/VehicleForm.jsx
import React, { useState } from 'react';
import { createVehicle } from '../services/vehicle.service';

function VehicleForm({ userId, onVehicleCreated }) {
  const [marca, setMarca] = useState('');
  const [matricula, setMatricula] = useState('');
  const [color, setColor] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = await createVehicle({ marca, matricula, color, propietario: userId });
      onVehicleCreated(newVehicle);
      setMarca('');
      setMatricula('');
      setColor('');
    } catch (error) {
      console.error('Error creating vehicle:', error);
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
      <button type="submit">Crear Vehículo</button>
    </form>
  );
}

export default VehicleForm;
