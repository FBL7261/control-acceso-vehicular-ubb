import React, { useState } from 'react';

function VehicleUpdateForm({ vehicle, onUpdate }) {
  const [marca, setMarca] = useState(vehicle.marca);
  const [matricula, setMatricula] = useState(vehicle.matricula);
  const [color, setColor] = useState(vehicle.color);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate({ marca, matricula, color });
    } catch (error) {
      console.error('Error updating vehicle:', error);
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
      <button type="submit">Actualizar Vehículo</button>
    </form>
  );
}

export default VehicleUpdateForm;