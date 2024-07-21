import React, { useState } from 'react';
import { createRegEntry } from '../services/regEntry.service';
import NavbarGuard from '../components/NavbarGuard';
import '../index.css';

const CreateRegEntry = () => {
  const [entry, setEntry] = useState({ rut: '', plate: '', name: '', reason: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRegEntry(entry);
      console.log('Entrada registrada con éxito');
      setEntry({ rut: '', plate: '', name: '', reason: '' }); // Limpiar el formulario
    } catch (error) {
      console.log('Error al registrar la entrada');
    }
  };

  return (
    <>
      <NavbarGuard />
      <div>
        <h2>Registrar Nueva Entrada</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>RUT:</label>
            <input type="text" name="rut" value={entry.rut} onChange={handleChange} required />
          </div>
          <div>
            <label>Patente:</label>
            <input type="text" name="plate" value={entry.plate} onChange={handleChange} required />
          </div>
          <div>
            <label>Nombre:</label>
            <input type="text" name="name" value={entry.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Razón:</label>
            <input type="text" name="reason" value={entry.reason} onChange={handleChange} />
          </div>
          <button type="submit">Registrar Entrada</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default CreateRegEntry;