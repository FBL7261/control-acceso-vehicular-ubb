import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRegEntry } from '../services/regEntry.service';
import '../styles/RegList.css'; // Importar el archivo CSS
import { deleteRegEntry } from '../services/regEntry.service';

const RegEntryList = () => {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (entries.length === 0) {
            getRegEntry().then(
                (response) => {
                    if (response.data && Array.isArray(response.data.data)) {
                        console.log('Entries from server:', response.data.data);
                        setEntries(response.data.data);
                    } else {
                        setError('La respuesta del servidor no es un array.');
                    }
                },
                (error) => {
                    setError(error.message);
                }
            );
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteRegEntry(id);
            setEntries(entries.filter((entry) => entry._id !== id));
            console.log('Registro eliminado con éxito');
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container">
            <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
            <h2>Lista de Registros de Entrada</h2>
            <div className="entry-list">
                <div className="entry-regs">
                    {entries.map((entry) => (
                        <div key={entry._id} className="entry-reg">
                            <button className="deletereg-button" onClick={() => handleDelete(entry._id)}></button>
                            <strong>RUT:</strong> {entry.rut}<br />
                            <strong>Patente:</strong> {entry.plate}<br />
                            <strong>Nombre:</strong> {entry.name}<br />
                            <strong>Razón:</strong> {entry.reason}<br />
                            <strong>Fecha:</strong> {new Date(entry.date).toLocaleString()}<br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegEntryList;