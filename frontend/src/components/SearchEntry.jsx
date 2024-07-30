import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchEntry.css';

const SearchEntry = () => {
  const [searchParams, setSearchParams] = useState({ date: '', plate: '' });
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const date = query.get('date') || '';
    const plate = query.get('plate') || '';
    setSearchParams({ date, plate });
    generateDateOptions();
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, plate } = searchParams;
    let query = '';

    if (date) query += `date=${date}&`;
    if (plate) query += `plate=${plate}&`;

    query = query.slice(0, -1);

    navigate(`/search?${query}`);
  };

  const generateDateOptions = () => {
    const today = new Date();
    const datesArray = [];
    for (let i = 0; i < 90; i++) { // Extender a 90 días
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      datesArray.push(date.toISOString().split('T')[0]);
    }
    setDates(datesArray);
  };

  return (
    <form className="search-bar-entry" onSubmit={handleSubmit}>
      <select name="date"value={searchParams.date} onChange={handleChange} className='search-date-order'>
        <option value="">Seleccionar Fecha</option>
        {dates.map((date) => (
          <option key={date} value={date}>
            {date.split('-').reverse().join('-')}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="plate"
        placeholder="Patente"
        value={searchParams.plate}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchEntry;
