import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import requestService from '../services/request.service';
import AuthContext from '../context/AuthContext';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '../styles/RequestList.css';

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [pdfs, setPdfs] = useState({});
    const pdfjsDistVersion = '3.1.81';
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Obtener el usuario del contexto

    useEffect(() => {
        const fetchRequests = async () => {
            if (user && user.roles && user.roles.includes('admin')) {
                setIsAdmin(true);
                try {
                    const response = await requestService.getRequests();
                    if (response.data && Array.isArray(response.data.data)) {
                        const pendingRequests = response.data.data.filter(request => request.status === 'Pendiente');
                        setRequests(pendingRequests);
                        pendingRequests.forEach(request => fetchPDFs(request._id)); // Llamamos a fetchPDFs para cada solicitud
                    } else {
                        setError('La respuesta del servidor no es un array.');
                    }
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsAdmin(false);
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, [user]);

    const fetchPDFs = async (requestId) => {
        try {
            const pdfsData = await requestService.getPDFsByRequestId(requestId);
            setPdfs((prevPdfs) => ({ ...prevPdfs, [requestId]: pdfsData.data })); // Ajuste aquí para obtener los datos correctamente
        } catch (error) {
            console.error('Error fetching PDFs:', error.message);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await requestService.updateRequestStatus(id, newStatus);
            setRequests((prevRequests) =>
                prevRequests.filter((request) =>
                    request._id !== id
                )
            );
        } catch (error) {
            console.error('Error updating request status:', error.message);
        }
    };

    if (isLoading) {
        return <div className="loading">Cargando...</div>;
    }

    if (!isAdmin) {
        return <div className="error">No tienes permisos para ver esta página</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="request-list">
            <a href="#" className="back-button" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span className="ml-1 font-bold text-lg">Volver</span>
            </a>
            <h2>Lista de Solicitudes</h2>
            {requests.length === 0 ? (
                <div className="no-requests">No quedan solicitudes pendientes</div>
            ) : (
                <ul>
                    {requests.map((request) => (
                        <li key={request._id} className="request-item">
                            <strong>Nombre de Usuario:</strong> {request.username}<br />
                            <strong>RUT:</strong> {request.rut}<br />
                            <strong>Email:</strong> {request.email}<br />
                            <strong>Descripción de la solicitud:</strong> {request.description}<br />
                            <strong>Estado:</strong> {request.status}<br />
                            <strong>Solicitud enviada:</strong> {new Date(request.createdAt).toLocaleString()}<br />
                            <strong>Pdf adjunto:</strong>
                            <ul>
                                {pdfs[request._id] && pdfs[request._id].length > 0 ? (
                                    pdfs[request._id].map(pdf => (
                                        <li key={pdf._id}>
                                            <button onClick={() => setSelectedPdf(`http://localhost:3000/uploads/${pdf.filePath}`)}>
                                                Ver {pdf.name}
                                            </button>
                                            {selectedPdf === `http://localhost:3000/uploads/${pdf.filePath}` && (
                                                <div className="pdf-viewer">
                                                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsDistVersion}/build/pdf.worker.min.js`}>
                                                        <Viewer fileUrl={selectedPdf} />
                                                    </Worker>
                                                </div>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li>No hay PDFs adjuntos.</li>
                                )}
                            </ul>
                            <div className="action-buttons">
                                <button className="approve-button" onClick={() => handleStatusChange(request._id, 'Aprobada')}>Aprobar</button>
                                <button className="reject-button" onClick={() => handleStatusChange(request._id, 'Rechazada')}>Rechazar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RequestList;
