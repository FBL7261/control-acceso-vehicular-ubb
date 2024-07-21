import React, { useState } from 'react';
import vehicleService from '../services/vehicle.service';

function VehicleForm({ onSubmit, initialData = {} }) {
  const [vehicle, setVehicle] = useState({
    matricula: initialData.matricula || '',
    modelo: initialData.modelo || '',
    marca: initialData.marca || '',
    color: initialData.color || '',
    foto: initialData.foto || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setVehicle((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(vehicle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Matrícula:</label>
        <input type="text" name="matricula" value={vehicle.matricula} onChange={handleChange} required />
      </div>
      <div>
        <label>Modelo:</label>
        <input type="text" name="modelo" value={vehicle.modelo} onChange={handleChange} required />
      </div>
      <div>
        <label>Marca:</label>
        <input type="text" name="marca" value={vehicle.marca} onChange={handleChange} required />
      </div>
      <div>
        <label>Color:</label>
        <input type="text" name="color" value={vehicle.color} onChange={handleChange} required />
      </div>
      <div>
        <label>Foto:</label>
        <input type="file" name="foto" onChange={handleFileChange} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}

export default VehicleForm;
