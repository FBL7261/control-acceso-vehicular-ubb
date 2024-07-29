import React, { useState } from 'react';
import { createRegEntry, createRegEntryUser } from '../services/regEntry.service';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert } from './Alertmsg';
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
  const [entry, setEntry] = useState({ rut: '', plate: '', name: '', reason: '' });
  const [formType, setFormType] = useState('user'); // 'user' or 'visitor'
  const navigate = useNavigate();

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

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'user') {
        await createRegEntryUser(entry);
        showSuccessAlert('Entrada de usuario registrada con éxito');
      } else {
        await createRegEntry(entry);
        showSuccessAlert('Entrada de visitante registrada con éxito');
      }
      setEntry({ rut: '', plate: '', name: '', reason: '' }); // Limpiar el formulario
      navigate('/guard-home'); // Redirigir a la página de inicio del guardia
    } catch (error) {
      showErrorAlert('Error al registrar la entrada. Verifique los datos ingresados.');
      console.log('Error al registrar la entrada', error);
    }
  };

  return (
    <div className="create-entry-container">
      
      <form className="create-entry-form" onSubmit={handleSubmit}>
      <div className="button-group-regs">
        <button onClick={() => setFormType('user')} className={formType === 'user' ? 'active' : ''}>Usuario</button>
        <button onClick={() => setFormType('visitor')} className={formType === 'visitor' ? 'active' : ''}>Visita</button>
      </div>
        <h2>Registrar {formType === 'user' ? 'Entrada Usuario' : 'Entrada Visita'}</h2>
        <div className="form-group">
          <label>RUT:</label>
          <input 
            type="text" 
            name="rut" 
            value={entry.rut} 
            placeholder='XXXXXXXX-X'
            onChange={handleChange} 
            required 
            maxLength={10}
            minLength={10}
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
        {formType === 'visitor' && (
          <>
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
          </>
        )}
        <button type="submit">Registrar Entrada</button>
      </form>
    </div>
  );
};

export default CreateRegEntry;
