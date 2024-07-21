import React, { useEffect, useState } from 'react';
import requestService from '../services/request.service';
import { getCurrentUser } from '../services/auth.service';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const pdfjsDistVersion = '3.1.81'; // Definir la versión aquí

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (currentUser && currentUser.roles && currentUser.roles.includes('admin')) {
            setIsAdmin(true);
            requestService.getRequests().then(
                (response) => {
                    if (response.data && Array.isArray(response.data.data)) {
                        console.log('Requests from server:', response.data.data);
                        setRequests(response.data.data);
                    } else {
                        setError('La respuesta del servidor no es un array.');
                    }
                    setIsLoading(false);
                },
                (error) => {
                    setError(error.message);
                    setIsLoading(false);
                }
            );
        } else {
            setIsAdmin(false);
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!isAdmin) {
        return <div>No tienes permisos para ver esta página</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Lista de Solicitudes</h2>
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
                                        <button onClick={() => setSelectedPdf(`http://localhost:3000/uploads/${pdf.filePath}`)}>
                                            Ver {pdf.name}
                                        </button>
                                        {selectedPdf === `http://localhost:3000/uploads/${pdf.filePath}` && (
                                            <div style={{ height: '500px' }}>
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RequestList;
