import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarGuard from '../components/NavbarGuard';
import '../index.css';
//import { SearchRegEntry } from '../components/SearchRegEntry';

const HomeGuard = () => {
  const navigate = useNavigate();

  const handleViewEntries = () => {
    navigate('/reg-entries'); // Redirigir a la ruta de entradas registradas
  };

  const handleCreateEntry = () => {
    navigate('/create-reg-entry'); // Redirigir a la ruta de crear una nueva entrada
  };

  return (
    <>
      <NavbarGuard />
      <div>
        <h1>Bienvenido al Panel del Guardia</h1>
        <p>Este es el contenido de la página de inicio para el guardia.</p>
        <button onClick={handleViewEntries}>Ver Entradas Registradas</button> {/* Botón para ver entradas */}
        <button onClick={handleCreateEntry} style={{ marginLeft: '10px' }}>Registrar Nueva Entrada</button> {/* Botón para registrar nueva entrada */}
      </div>
    </>
  );
};

export default HomeGuard;