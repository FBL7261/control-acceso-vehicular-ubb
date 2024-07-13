import React from 'react';
import Navbar from '../components/Navbar';
import VehiclesPage from './VehiclesPage'; // Asegúrate de importar el componente

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <VehiclesPage /> {/* Incluir la página de vehículos en la página de inicio */}
      </div>
    </>
  );
}

export default Home;
