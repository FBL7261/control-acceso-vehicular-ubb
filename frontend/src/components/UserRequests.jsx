import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestService from '../services/request.service';
import '../styles/UserRequests.css'; // Importar el archivo CSS

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log('Iniciando fetch de solicitudes...');
        const response = await requestService.getRequestsByUserEmail();
        const requests = response.data;
        console.log('Solicitudes recibidas:', requests);
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
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-requests">
      <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
      <h2>Mis Solicitudes</h2>
      {requests.length === 0 ? (
        <div className="no-requests">No has enviado ninguna solicitud</div>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request._id}>
              <strong>Nombre de usuario:</strong> {request.username}<br />
              <strong>RUT:</strong> {request.rut}<br />
              <strong>Email:</strong> {request.email}<br />
              <strong>Descripción de la solicitud:</strong> {request.description}<br />
              <strong>Estado de la solicitud:</strong> {request.status}<br />
              <strong>Fecha de envío:</strong> {new Date(request.createdAt).toLocaleString()}<br />
              <strong>Pdf adjunto:</strong>
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
              {request.status === 'Aprobada' && (
                <div className="approved-message">
                  Su solicitud fue aprobada, contactese con el administrador para recibir su credencial
                </div>
              )}
              {request.status === 'Rechazada' && (
                <div className="rejected-message">
                  Si su solicitud fue rechazada, puede intentar enviar una nueva solicitud
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRequests;
