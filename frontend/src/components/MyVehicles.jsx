import React, { useEffect, useState } from 'react';
import axios from '../services/root.service';
import { useNavigate } from 'react-router-dom';

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario autenticado del localStorage
        if (!user || !user._id) {
          throw new Error('Usuario no autenticado');
        }

        const response = await axios.get(`/vehicles/user/${user._id}`); // Usar el ID del usuario en la URL
        setVehicles(response.data.data); // Ajusta según la estructura de tu respuesta
      } catch (error) {
        setError('Error al obtener los vehículos');
        if (error.response && error.response.status === 401) {
          console.error('No autorizado. Redirigiendo a login...');
          navigate('/login'); // Redirigir a la página de inicio de sesión
        } else {
          console.error('Error al obtener los vehículos:', error);
        }
      } finally {
        setLoading(false); // Finalizar estado de carga
      }
    };

    fetchVehicles();
  }, [navigate]);

  if (loading) return <p>Cargando vehículos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mis Vehículos</h1>
      {vehicles.length > 0 ? (
        <ul>
          {vehicles.map(vehicle => (
            <li key={vehicle._id}>
              <p>Matrícula: {vehicle.matricula}</p>
              <p>Modelo: {vehicle.modelo}</p>
              <p>Marca: {vehicle.marca}</p>
              <p>Color: {vehicle.color}</p>
              {vehicle.foto && <img src={`http://localhost:3000/${vehicle.foto}`} alt="Foto del vehículo" />}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes vehículos registrados.</p>
      )}
    </div>
  );
};

export default MyVehicles;
