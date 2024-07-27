import React, { useState, useEffect } from "react";
import { getRegEntryByRut, getRegEntryByPlate, getEntryByDate } from '../services/regEntry.service';

const Search = () => {
    const [entries, setEntries] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [error, setError] = useState(null);

    const showData = async () => {
        try {
            const data = await getEntryByDate('');
            setEntries(data);
        } catch (error) {
            setError('Error fetching data: ' + error.message);
            console.error('Error fetching data', error);
        }
    };

    const searcher = (e) => {
        setSearchParams(e.target.value);
    };

    const handleSearch = async () => {
        setError(null);
        try {
            let data = [];
            if (searchParams) {
                // Intentar buscar por cada campo
                const byDate = await getEntryByDate(searchParams);
                const byRut = await getRegEntryByRut(searchParams);
                const byPlate = await getRegEntryByPlate(searchParams);
                // Combinar los resultados y eliminar duplicados
                const combined = [...byDate, ...byRut, ...byPlate];
                const uniqueEntries = Array.from(new Set(combined.map(entry => entry._id)))
                    .map(id => combined.find(entry => entry._id === id));
                data = uniqueEntries;
            } else {
                data = await getEntryByDate('');
            }
            setEntries(data);
        } catch (error) {
            setError('Error searching data: ' + error.message);
            console.error('Error searching data', error);
        }
    };

    // Método de filtrado
    let results = [];
    if (!searchParams) {
        results = entries;
    } else {
        results = entries.filter((dato) =>
            dato.plate.toLowerCase().includes(searchParams.toLowerCase()) ||
            dato.date.toLowerCase().includes(searchParams.toLowerCase()) ||
            dato.rut.toLowerCase().includes(searchParams.toLowerCase())
        );
    }

    useEffect(() => {
        showData();
    }, []);

    return (
        <div className="container">
            <input
                value={searchParams}
                onChange={searcher}
                placeholder="Buscar por patente, fecha o rut"
            />
            <button onClick={handleSearch}>Buscar</button>
            {error && <div className="error">{error}</div>}
            <table className="table-entrys">
                <thead>
                    <tr>
                        <th>Patente</th>
                        <th>Fecha</th>
                        <th>Rut</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((entry) => (
                        <tr key={entry._id}>
                            <td>{entry.plate}</td>
                            <td>{entry.date}</td>
                            <td>{entry.rut}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Search;