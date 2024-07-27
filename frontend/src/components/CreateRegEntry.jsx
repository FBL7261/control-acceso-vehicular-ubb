import React, { useState } from 'react';
import { createRegEntry } from '../services/regEntry.service';
import '../styles/CreateRegEntry.css';
// Función para formatear el RUT
const formatRut = (rut) => {
  const cleaned = rut.replace(/[^0-9kK]/g, '');
  if (cleaned.length > 1) {
    return `${cleaned.slice(0, -1)}-${cleaned.slice(-1)}`;
  }
  return cleaned;
};
// Función para formatear la patente
const formatPlate = (plate) => {
  const cleaned = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return cleaned.replace(/(.{2})(.{2})(.{2})/, '$1.$2.$3');
};

const CreateRegEntry = () => {
  const [entry, setEntry] = useState({ 
    rut: '', 
    plate: '', 
    name: '', 
    reason: '' 
  });
// Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'rut') {
      formattedValue = formatRut(value);
    } else if (name === 'plate') {
      formattedValue = formatPlate(value);
    }
    setEntry({ ...entry, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRegEntry(entry);
      console.log('Entrada registrada con éxito');
      setEntry({ rut: '', plate: '', name: '', reason: '' }); // Limpiar el formulario
    } catch (error) {
      console.log('Error al registrar la entrada', error);
    }
  };

  return (
    <div className="create-entry-container">
      <form className="create-entry-form" onSubmit={handleSubmit}>
        <h2>Registrar Nueva Entrada</h2>
        <div className="form-group">
          <label>RUT:</label>
          <input 
            type="text" 
            name="rut"
            value={entry.rut} 
            placeholder='xxxxxxxx-x'
            onChange={handleChange} 
            required 
            maxLength={10}
            minLength={9}
          />
        </div>
        <div className="form-group">
          <label>Patente:</label>
          <input 
            type="text" 
            name="plate" 
            value={entry.plate} 
            placeholder='XX.XX.XX'
            onChange={handleChange} 
            required
            maxLength={8}
            minLength={8}
          />
        </div>
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            name="name" 
            value={entry.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Razón:</label>
          <input 
            type="text" 
            name="reason" 
            value={entry.reason} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Registrar Entrada</button>
      </form>
    </div>
  );
};

export default CreateRegEntry;