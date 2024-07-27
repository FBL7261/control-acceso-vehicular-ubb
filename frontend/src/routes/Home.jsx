import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../index.css";

const Home = () => {
  const navigate = useNavigate();

  const handleViewRequests = () => {
    navigate("/requests"); // Redirigir a la ruta de solicitudes del usuario logueado
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Bienvenido a la página principal</h1>
        <p>Este es el contenido de la página de inicio.</p>
        <button onClick={handleViewRequests}>Ver mis solicitudes</button>{" "}
        {/* Nuevo botón */}
      </div>
    </>
  );
};

export default Home;
