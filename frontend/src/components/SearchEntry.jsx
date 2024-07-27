import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchEntry.css';

const SearchEntry = () => {
  const [searchParams, setSearchParams] = useState({ date: '', rut: '', plate: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, rut, plate } = searchParams;
    let query = '';

    if (date) query += `date=${date}&`;
    if (rut) query += `rut=${rut}&`;
    if (plate) query += `plate=${plate}&`;

    // Remove the last '&' character
    query = query.slice(0, -1);

    navigate(`/search?${query}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        name="date"
        placeholder="Fecha (YYYY-MM-DD)"
        value={searchParams.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="rut"
        placeholder="RUT"
        value={searchParams.rut}
        onChange={handleChange}
      />
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