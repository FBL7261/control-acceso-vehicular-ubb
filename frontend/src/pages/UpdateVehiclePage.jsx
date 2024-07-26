import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserVehicles } from '../services/vehicle.service';
import UpdateVehicleForm from '../components/UpdateVehicleForm'; // Import the UpdateVehicleForm component
import Modal from '../components/Modal'; // Import the Modal component
import '../styles/UserVehicles.css'; // Import the CSS file

const UpdateVehiclePage = () => {
  const navigate = useNavigate(); // For redirection
  const [vehicles, setVehicles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  useEffect(() => {
    const userIdFromSession = sessionStorage.getItem('userId');
    setUserId(userIdFromSession);
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!userId) return;
      try {
        const response = await getUserVehicles(userId);
        setVehicles(response.data);
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    };

    fetchVehicles();
  }, [userId]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleUpdateClick = (vehicleId) => {
    navigate(`/vehicles/update-vehicle/updating/${vehicleId}`);
  
  };

  const handleFormSubmit = () => {
    setSelectedVehicleId(null);

  };

  return (
    <div className="user-vehicles-page">
      <h1>Mis Vehículos</h1>
      {vehicles.length === 0 ? (
        <p>Actualmente no posees vehículos registrados</p>
      ) : (
        <div className="vehicle-grid">
          {vehicles.map(vehicle => (
            <div key={vehicle._id} className="vehicle-card">
              {vehicle.foto && (
                <img
                  src={`http://localhost:3000/upload/${vehicle.foto}`}
                  alt={`${vehicle.marca} ${vehicle.modelo}`}
                  onClick={() => handleImageClick(`http://localhost:3000/upload/${vehicle.foto}`)}
                />
              )}
              <p><strong>Matrícula:</strong> {vehicle.matricula}</p>
              <p><strong>Modelo:</strong> {vehicle.modelo}</p>
              <p><strong>Marca:</strong> {vehicle.marca}</p>
              <p><strong>Color:</strong> {vehicle.color}</p>
              <button onClick={() => handleUpdateClick(vehicle._id)}>Actualizar</button>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedImage && <img src={selectedImage} alt="Vehicle" style={{ maxWidth: '100%' }} />}
      </Modal>
      {selectedVehicleId && (
        <UpdateVehicleForm vehicleId={selectedVehicleId} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default UpdateVehiclePage;