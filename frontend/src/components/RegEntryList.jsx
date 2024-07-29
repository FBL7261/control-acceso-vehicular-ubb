import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteRegEntry, getRegEntry, getEntryByDate, getRegEntryByPlate } from '../services/regEntry.service';
import { showSuccessAlert, showErrorAlert } from './Alertmsg';
import SearchEntry from './SearchEntry'; 
import '../styles/RegList.css';

const RegEntryList = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('fechaAsc'); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchEntries();
  }, [location, sortOrder]);

  const fetchEntries = async () => {
    const query = new URLSearchParams(location.search);
    const date = query.get('date');
    const plate = query.get('plate');

    try {
      let response;
      if (date) {
        response = await getEntryByDate(date);
      } else if (plate) {
        response = await getRegEntryByPlate(plate);
      } else {
        response = await getRegEntry();
      }

      console.log('API response:', response); // Debugging response

      if (response.data && (Array.isArray(response.data.data) || Array.isArray(response.data))) {
        let data = response.data.data || response.data;
        data = sortEntries(data, sortOrder);
        console.log('Entries from server:', data); // Debugging entries
        setEntries(data);
        showSuccessAlert('Registros encontrados con éxito');
      } else {
        showErrorAlert('No se encontraron registros.');
      }
    } catch (error) {
      showErrorAlert('No se han encontrado registros.');
      console.error('Error fetching entries:', error); // Debugging error
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
    <div className="container-entry-list">
        <button className="back-buttonn" onClick={() => navigate("/guard-home")}>Volver</button>
        <h2>Lista de Registros de Entrada</h2>

      <SearchEntry />
      <div className="filters">
        <select value={sortOrder} onChange={handleSortOrderChange} className="sort-order">
          <option value="fechaAsc">Ascendente</option>
          <option value="fechaDesc">Descendente</option>
        </select>
        <button onClick={handleTodaySearch} className="today-button">Buscar hoy</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      <div className="entry-table-box">
      <table className="entry-table">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Patente</th>
            <th>Nombre</th>
            <th>Razón</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rut}</td>
              <td>{entry.plate}</td>
              <td>{entry.name}</td>
              <td>{entry.reason}</td>
              <td>{new Date(entry.date).toLocaleString()}</td>
              <td>
                <button className="deletereg-button" onClick={() => handleDelete(entry._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default RegEntryList;
