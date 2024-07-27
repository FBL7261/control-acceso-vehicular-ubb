import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEntryByDate, deleteRegEntry } from '../services/regEntry.service';
import '../styles/RegList.css';

const SearchRegByDate = () => {
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(null);
    try {
      const response = await getEntryByDate(date);
      if (response.data && Array.isArray(response.data.data)) {
        console.log('Entries from server:', response.data.data);
        setEntries(response.data.data);
      } else {
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

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
      <h2>Buscar Registros por Fecha</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Fecha (DD-MM-YYYY)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>
      <h2>Resultados de Búsqueda por Fecha: {date}</h2>
      <div className="entry-list">
        <div className="entry-regs">
          {entries.map((entry) => (
            <div key={entry._id} className="entry-reg">
              <button className="deletereg-button" onClick={() => handleDelete(entry._id)}></button>
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

export default SearchRegByDate;