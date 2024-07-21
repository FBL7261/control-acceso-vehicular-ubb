import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Home = () => {
  const navigate = useNavigate();

  const handleViewRequests = () => {
    navigate('/requests'); // Redirige a la ruta de solicitudes del usuario logueado
  };

  const handleViewVehicles = () => {
    navigate('/vehicles'); // Redirige a la ruta de vehículos
  };

  return (
    <>
      <div>
        <h1>Bienvenido a la página principal</h1>
        <p>Este es el contenido de la página de inicio.</p>
        <button onClick={handleViewRequests}>Ver mis solicitudes</button>
      </div>
    </>
  );
};

export default Home;
