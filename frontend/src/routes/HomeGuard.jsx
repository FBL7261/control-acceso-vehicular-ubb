import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarGuard from '../components/NavbarGuard';
import CreateRegEntry from '../components/CreateRegEntry';
import CreateRegEntryUser from '../components/CreateREUser';
import '../styles/GuardiaInterface.css';

const HomeGuard = () => {
  const navigate = useNavigate();

  const handleViewEntries = () => {
    navigate('/reg-entries'); // Redirigir a la ruta de entradas registradas
  };

  return (
    <>
      <NavbarGuard />
      <div className='guard-interface'>
        <h1>Welcome</h1>
        <p>Este es el contenido de la página de inicio para el guardia.</p>
        <button onClick={handleViewEntries} className='guard-button'>Ver Entradas Registradas</button> {/* Botón para ver entradas */}
        <div className='create-entry-box'>
          <CreateRegEntry /> {/* Incluir el formulario de registro aquí */}
        </div>
        <div className='create-entry-user-box'>
          <CreateRegEntryUser /> {/* Incluir el formulario de registro de usuario aquí */}
        </div>
      </div>
    </>
  );
};

export default HomeGuard;