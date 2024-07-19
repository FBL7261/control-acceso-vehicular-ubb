// frontend/src/routes/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import '../index.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1>Bienvenido a la página principal</h1>
        <p>Este es el contenido de la página de inicio.</p>
      </div>
    </>
  );
};

export default Home;
