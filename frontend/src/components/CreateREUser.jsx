import React, { useState } from 'react';
import { createRegEntryUser } from '../services/regEntry.service';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateRegEntry.css';

const CreateRegEntryUser = () => {
  const [entry, setEntry] = useState({ 
    rut: '',
    plate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRegEntryUser(entry);
      console.log('Entrada registrada con éxito');
      setEntry({ rut: '', plate: '' }); // Limpiar el formulario
      navigate('/guard-home'); // Redirigir a la página de inicio del guardia
    } catch (error) {
      console.log('Error al registrar la entrada', error);
    }
  };

  return (
    <div className="create-entry-container">
      <form className="create-entry-form" onSubmit={handleSubmit}>
        <h2>Registrar Entrada Usuario</h2>
        <div className="form-group">
          <label>RUT:</label>
          <input 
            type="text" 
            name="rut" 
            value={entry.rut} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Patente:</label>
          <input 
            type="text" 
            name="plate" 
            value={entry.plate} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Registrar Entrada</button>
      </form>
    </div>
  );
};

export default CreateRegEntryUser;