import React, { useEffect, useState } from 'react';
import { getRequestsByUserId } from '../services/request.service';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [data, error] = await getRequestsByUserId();
        if (error) {
          throw new Error(error);
        }
        setRequests(data || []); // Asegúrate de que data siempre sea un array
      } catch (err) {
        console.error('Error fetching requests:', err.message);
        setError(err.message);
        setRequests([]); // En caso de error, asegúrate de que requests sea un array vacío
      }
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Mis Solicitudes</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <li key={request._id}>
              <strong>Username:</strong> {request.user.username} <br />
              <strong>Description:</strong> {request.description} <br />
              <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()} <br />
              <a href={`/requests/${request._id}`}>Ver Detalles</a>
            </li>
          ))
        ) : (
          <p>No hay solicitudes disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default UserRequests;
