import React, { useEffect, useState } from 'react';
import requestService from '../services/request.service';
import { getCurrentUser } from '../services/auth.service';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await requestService.getRequestsByEmail();
        if (Array.isArray(requests)) {
          setRequests(requests);
        } else {
          setError('La respuesta del servidor no es un array.');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Mis Solicitudes</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <strong>ID:</strong> {request._id}<br />
            <strong>Username:</strong> {request.username}<br />
            <strong>RUT:</strong> {request.rut}<br />
            <strong>Email:</strong> {request.email}<br />
            <strong>Description:</strong> {request.description}<br />
            <strong>Status:</strong> {request.status}<br />
            <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}<br />
            <strong>PDFs:</strong>
            <ul>
              {request.pdfs && request.pdfs.length > 0 ? (
                request.pdfs.map(pdf => (
                  <li key={pdf._id}>
                    <a href={`http://localhost:3000/uploads/${pdf.filePath}`} target="_blank" rel="noopener noreferrer">
                      {pdf.name}
                    </a>
                  </li>
                ))
              ) : (
                <li>No hay PDFs adjuntos.</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRequests;
