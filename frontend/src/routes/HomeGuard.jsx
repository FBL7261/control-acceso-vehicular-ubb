import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarGuard from '../components/NavbarGuard';
//import '../index.css';
import '../styles/GuardiaInterface.css';
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
      <div className='guard-interface'>
        <h1>Welcome</h1>
        <p>Este es el contenido de la página de inicio para el guardia.</p>
        <button onClick={handleViewEntries} className='guard-button'>Ver Entradas Registradas</button> {/* Botón para ver entradas */}
        <button onClick={handleCreateEntry} style={{ marginBlock: '10px' }} className='guard-button'>Registrar Nueva Entrada</button> {/* Botón para registrar nueva entrada */}
      </div>
    </>
  );
};

export default HomeGuard;