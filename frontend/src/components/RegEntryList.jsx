import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteRegEntry, getRegEntry, getEntryByDate, getRegEntryByPlate, getRegEntryByRut } from '../services/regEntry.service';
import SearchEntry from './SearchEntry'; // Importa el componente de búsqueda
import '../styles/RegList.css';

const RegEntryList = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('fechaAsc'); // Estado para el orden de clasificación
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchEntries();
  }, [location, sortOrder]); // Añadir sortOrder como dependencia

  const fetchEntries = async () => {
    const query = new URLSearchParams(location.search);
    const date = query.get('date');
    const rut = query.get('rut');
    const plate = query.get('plate');

    try {
      let response;
      if (date) {
        response = await getEntryByDate(date);
      } else if (rut) {
        response = await getRegEntryByRut(rut);
      } else if (plate) {
        response = await getRegEntryByPlate(plate);
      } else {
        response = await getRegEntry();
      }

      if (response.data && Array.isArray(response.data.data)) {
        let data = response.data.data;
        data = sortEntries(data, sortOrder); // Ordenar los datos según el orden seleccionado
        console.log('Entries from server:', data);
        setEntries(data);
      } else {
        setError('La respuesta del servidor no es un array.');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching entries:', error); // depuración
    }
  };

  const sortEntries = (entries, order) => {
    switch (order) {
      case 'fechaAsc':
        return entries.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'fechaDesc':
        return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return entries;
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

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleTodaySearch = () => {
    const today = new Date().toISOString().split('T')[0];
    navigate(`/search?date=${today}`);
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/guard-home")}>Volver</button>
      <h2>Lista de Registros de Entrada</h2>
      <SearchEntry /> {/* Añade el componente de búsqueda */}
      <div className="filters">
        <select value={sortOrder} onChange={handleSortOrderChange} className="sort-order">
          <option value="fechaAsc">Fecha ascendente</option>
          <option value="fechaDesc">Fecha descendente</option>
        </select>
        <button onClick={handleTodaySearch} className="today-button">Buscar hoy</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
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

export default RegEntryList;