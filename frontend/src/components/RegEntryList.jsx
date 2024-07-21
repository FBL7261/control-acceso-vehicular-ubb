import React, { useState, useEffect } from 'react';
import { getAllEntries } from '../services/regEntry.service';

const SearchRegEntry = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getAllEntries();
        setEntries(data);
      } catch (error) {
        console.error('Error al obtener los registros de entrada:', error);
      }
    };

    fetchEntries();
  }, []);

  const filteredEntries = entries.filter(entry =>
    entry.rut.includes(searchTerm) ||
    entry.plate.includes(searchTerm) ||
    entry.name.includes(searchTerm)
  );

  return (
    <div>
      <h2>Buscar Registros de Entrada</h2>
      <input
        type="text"
        placeholder="Buscar por RUT, Patente o Nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredEntries.map(entry => (
          <li key={entry._id}>
            {entry.rut} - {entry.plate} - {entry.name} - {new Date(entry.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegEntryList;