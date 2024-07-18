// frontend/src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import VehiclesPage from './VehiclesPage';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <VehiclesPage />
      </div>
    </>
  );
}

export default Home;