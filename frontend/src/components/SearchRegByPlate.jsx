import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRegEntryByPlate, deleteRegEntry } from '../services/regEntry.service';
import '../styles/RegList.css';

const SearchRegByPlate = () => {
  const [plate, setPlate] = useState('');
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(null);
    try {
      const response = await getRegEntryByPlate(plate);
      console.log('Response from server:', response);
      if (response.data && Array.isArray(response.data)) {
        console.log('Entries from server:', response.data);
        setEntries(response.data);
      } else {
        console.log('Response from server:', response);
        setError('La respuesta del servidor no es un array.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRegEntry(id);
      setEntries(entries.filter((entry) => entry._id !== id));
      console.log('Registro eliminado con éxito');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
      <h2>Buscar Registros por Patente</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="XX.XX.XX"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          required
          maxLength={8}
          minLength={8}
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <div className="error">Error: {error}</div>}
      <h2>Resultados de Búsqueda por Patente: {plate}</h2>
      <div className="entry-list">
        <div className="entry-regs">
          {entries.map((entry) => (
            <div key={entry._id} className="entry-reg">
              <button className="deletereg-button" onClick={() => handleDelete(entry._id)}>Eliminar</button>
              <strong>RUT:</strong> {entry.rut}<br />
              <strong>Patente:</strong> {entry.plate}<br />
              <strong>Nombre:</strong> {entry.name}<br />
              <strong>Razón:</strong> {entry.reason}<br />
              <strong>Fecha:</strong> {new Date(entry.date).toLocaleString()}<br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchRegByPlate;