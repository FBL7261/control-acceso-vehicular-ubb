import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserVehicles, deleteVehicle } from '../services/vehicle.service';
import Modal from '../components/Modal'; // Import the Modal component
import '../styles/DeleteVehiclePage.css'; // Import the CSS file

const DeleteVehiclePage = () => {
  const navigate = useNavigate(); // For redirection after deletion
  const [vehicles, setVehicles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const userIdFromSession = sessionStorage.getItem('userId');
    console.log('User ID from session:', userIdFromSession); // Debug log
    setUserId(userIdFromSession);
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!userId) return;
      try {
        const response = await getUserVehicles(userId);
        console.log('Vehiculos obtenidos:', response); // Debug log
        setVehicles(response.data); // Access the data property
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        setError('Error al cargar los datos de los vehículos.');
      }
    };

    fetchVehicles();
  }, [userId]);

  const handleDelete = async (vehicleId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteVehicle(vehicleId);
      setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));
    } catch (err) {
      setError('Error al eliminar el vehículo.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (isDeleting) {
    return <p>Eliminando...</p>;
  }

  return (
    <div className="delete-vehicle-page">
      <a href="/vehicles" className="go-back">←</a>
      <h1 style={{ color: 'white' }}>Eliminar Vehículo</h1>
      {error && <p className="error">{error}</p>}
      <ul className="vehicle-list">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <li key={vehicle._id} className="vehicle-card">
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
              <button onClick={() => handleDelete(vehicle._id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p style={{ color: 'white' }}>No hay vehículos disponibles.</p>
        )}
      </ul>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedImage && <img src={selectedImage} alt="Vehicle" style={{ maxWidth: '100%' }} />}
      </Modal>
    </div>
  );
};

export default DeleteVehiclePage;