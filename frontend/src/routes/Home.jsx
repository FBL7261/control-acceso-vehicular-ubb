import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import { getCurrentUser } from '../services/auth.service';

const Home = () => {
  const user = getCurrentUser();

  return (
    <>
      <Navbar />
      <div className='container'>
        { user ? (
          <>
            <h1>Bienvenido a la página principal</h1>
            <p>En esta página usted puede realizar diversas acciones que se especifican en las tarjetas</p>
            <p>Esperamos su experiencia sea de su agrado</p>
            <div className="card-container">
              <div className="card">
                <h2>Crear Solicitud</h2>
                <p>En esta sección puedes crear nuevas solicitudes de servicios o productos.</p>
              </div>
              <div className="card">
                <h2>Mis Solicitudes</h2>
                <p>Aquí puedes ver todas las solicitudes que has realizado y su estado actual.</p>
              </div>
              <div className="card">
                <h2>Vehículos</h2>
                <p>Consulta la información y el estado de los vehículos disponibles.</p>
              </div>
            </div>
          </>
        ) : (
          <h1>Por favor, inicie sesión para ver el contenido</h1>
        )}
      </div>
    </>
  );
};

export default Home;
