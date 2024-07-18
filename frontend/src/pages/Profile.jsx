import React, { useState, useEffect } from 'react';
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import { profile } from "../services/auth.service";
import { getVehiclesByUser, createVehicle, deleteVehicle, updateVehicle } from '../services/vehicle.service';
import VehicleList from '../components/VehicleList';
import VehicleForm from '../components/VehicleForm';
import VehicleUpdateForm from '../components/VehicleUpdateForm';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    rut: '',
    rolName: ''
  });

  const [vehicles, setVehicles] = useState([]);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showVehicleList, setShowVehicleList] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    async function dataProfile() {
      try {
        const { data } = await profile();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    dataProfile();
  }, []);

  const fetchVehicles = async () => {
    const userVehicles = await getVehiclesByUser();
    setVehicles(userVehicles);
  };

  const handleVehicleCreated = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
    setShowVehicleForm(false);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    await deleteVehicle(vehicleId);
    setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));
  };

  const handleUpdateVehicle = async (vehicleData) => {
    const updatedVehicle = await updateVehicle(selectedVehicle._id, vehicleData);
    setVehicles(vehicles.map(vehicle => (vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle)));
    setShowUpdateForm(false);
    setSelectedVehicle(null);
  };

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
              },
              {
                label: "Rol",
                name: "role",
                type: "text",
                value: userProfile.rolName,
                disabled: true,
              },
            ]}
          />
        </div>
        <div className="vehicles-section">
          <h2>Gestión de Vehículos</h2>
          <button onClick={() => setShowVehicleForm(!showVehicleForm)}>Crear Vehículo</button>
          <button onClick={() => setShowVehicleList(!showVehicleList)}>Ver Lista de Vehículos</button>
          {showVehicleForm && <VehicleForm userId={userProfile.id} onVehicleCreated={handleVehicleCreated} />}
          {showVehicleList && <VehicleList vehicles={vehicles} onDelete={handleDeleteVehicle} onUpdate={(vehicle) => { setSelectedVehicle(vehicle); setShowUpdateForm(true); }} />}
          {showUpdateForm && selectedVehicle && <VehicleUpdateForm vehicle={selectedVehicle} onUpdate={handleUpdateVehicle} />}
        </div>
      </div>
    </main>
  );
};

export default Profile;