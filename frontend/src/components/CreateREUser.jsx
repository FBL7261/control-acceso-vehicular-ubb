import React, { useState } from 'react';
import { createRegEntryUser } from '../services/regEntry.service';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CreateRegEntry.css';

const formatRut = (rut) => {
  const cleaned = rut.replace(/[^0-9kK]/g, '');
  if (cleaned.length > 1) {
    return `${cleaned.slice(0, -1)}-${cleaned.slice(-1)}`;
  }
  return cleaned;
};

const formatPlate = (plate) => {
  const cleaned = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return cleaned.replace(/(.{2})(.{2})(.{2})/, '$1.$2.$3');
};

const CreateRegEntryUser = () => {
  const [entry, setEntry] = useState({ rut: '', plate: '' });

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRegEntryUser(entry);
      toast.success('Se ha registrado el ingreso con éxito');
      setEntry({ rut: '', plate: '' }); // Limpiar el formulario
      navigate('/guard-home'); // Redirigir a la página de inicio del guardia
    } catch (error) {
      toast.error('Error al registrar la entrada');
      console.log('Error al registrar la entrada', error);
    }
  };

  return (
    <div className="create-entry-container">
      <ToastContainer />
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
            maxLength={10}
            minLength={9}
            placeholder='xxxxxxxx-x'
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
            maxLength={8}
            minLength={8}
            placeholder='xx.xx.xx'
          />
        </div>
        <button type="submit">Registrar Entrada</button>
      </form>
    </div>
  );
};

export default CreateRegEntryUser;