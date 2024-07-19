// frontend/src/routes/Profile.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import { profile as fetchProfile } from "../services/auth.service";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    rut: ''
  });

  useEffect(() => {
    async function dataProfile() {  
      try {
        const data = await fetchProfile();
        setUserProfile(data.data); // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    dataProfile();
  }, []);

  return (
    <main className="profile_page">
      <Navbar />
      <div className="sections">
        <img className="profile_image" src="profile.png" alt="Imagen de perfil" />
        <div className="form">
          <Form
            backgroundColor="#FFFFFF"
            title="Perfil"
            fields={[
              {
                label: "Nombre de usuario",
                name: "username",
                type: "text",
                value: userProfile.username,
                disabled: true,
              },
              {
                label: "Correo electrónico",
                name: "email",
                type: "email",
                value: userProfile.email,
                disabled: true,
              },
              {
                label: "RUT",
                name: "rut",
                type: "text",
                value: userProfile.rut,
                disabled: true,
              }
              // Eliminado el campo rol
            ]}
          />
        </div>
        <div className="options">
          <h2>Opciones de Vehículos</h2>
          <ul>
            <li><Link to="/create-vehicle">Crear Vehículo</Link></li>
            <li><Link to="/update-vehicle">Actualizar Vehículo</Link></li>
            <li><Link to="/delete-vehicle">Eliminar Vehículo</Link></li>
            <li><Link to="/view-vehicles">Ver Vehículos</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Profile;
