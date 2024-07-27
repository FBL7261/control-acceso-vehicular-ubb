import React, { useEffect, useState } from 'react';
import { getUserVehicles } from '../services/vehicle.service';
import Modal from '../components/Modal'; // Import the Modal component
import '../styles/UserVehicles.css'; // Import the CSS file

const UserVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
        console.error('Error al obtener los vehÃ­culos:', error);
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

  return (
    <div className="user-vehicles-page">
      <h1>Mis Vehi­culos</h1>
      {vehicles.length === 0 ? (
        <p>Actualmente no posees vehiculos registrados</p>
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
              <p><strong>Matri­cula</strong> {vehicle.matricula}</p>
              <p><strong>Modelo</strong> {vehicle.modelo}</p>
              <p><strong>Marc:</strong> {vehicle.marca}</p>
              <p><strong>Colo:</strong> {vehicle.color}</p>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedImage && <img src={selectedImage} alt="Vehicle" style={{ maxWidth: '100%' }} />}
      </Modal>
    </div>
  );
}

export default UserVehicles;