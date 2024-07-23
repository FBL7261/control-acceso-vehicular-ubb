import React, { useState, useEffect } from 'react';
import { getRegEntry } from '../services/regEntry.service';
import { useNavigate } from 'react-router-dom';

const RegEntryList = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getRegEntry();
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setEntries([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los registros de entrada:', error);
        setError('Error al obtener los registros de entrada');
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Registros de Entrada</h2>
      {entries.length > 0 ? (
        <ul>
          {entries.map(entry => (
            <li key={entry._id}>
              {entry.rut} - {entry.plate} - {entry.name} - {new Date(entry.date).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron registros.</p>
      )}
    </div>
  );
};

export default RegEntryList;