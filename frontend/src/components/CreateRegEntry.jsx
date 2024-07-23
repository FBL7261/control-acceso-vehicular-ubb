import React, { useState } from 'react';
import { createRegEntry } from '../services/regEntry.service';
//import NavbarGuard from '../components/NavbarGuard';
import { useNavigate } from 'react-router-dom';
//import '../index.css';
//import '../styles/createRegEntry.css';
import '../styles/GuardiaInterface.css';
const CreateRegEntry = () => {
  const [entry, setEntry] = useState({ 
    rut: '', 
    plate: '', 
    name: '', 
    reason: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRegEntry(entry);
      console.log('Entrada registrada con éxito');
      setEntry({ rut: '', plate: '', name: '', reason: '' }); // Limpiar el formulario
      navigate('/guard-home'); // Redirigir a la página de inicio del guardia
    } catch (error) {
      console.log('Error al registrar la entrada', error);
    }
  };

  return (
    <>
      
      <div>
        <h2>Registrar Nueva Entrada</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>RUT:</label>
            <input 
            type="text" 
            name="rut"
            value={entry.rut} 
            placeholder='xxxxxxxx-x'
            onChange={handleChange} 
            required />
          </div>
          <div>
            <label>Patente:</label>
            <input 
            type="text" 
            name="plate" 
            value={entry.plate} 
            onChange={handleChange} 
            required />
          </div>
          <div>
            <label>Nombre:</label>
            <input 
            type="text" 
            name="name" 
            value={entry.name} 
            onChange={handleChange} 
            required />
          </div>
          <div>
            <label>Razón:</label>
            <input 
            type="text" 
            name="reason" 
            value={entry.reason} 
            onChange={handleChange} />
          </div>
          <button type="submit">Registrar Entrada</button>
        </form>
        {/* mensaje de error */}
        {}
      </div>
    </>
  );
};

export default CreateRegEntry;