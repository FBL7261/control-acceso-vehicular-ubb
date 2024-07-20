import React, { useState, useEffect } from 'react';
import { getRequests } from '../services/request.service';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests();
        // Aplanar el array de arrays y filtrar elementos nulos
        const validRequests = response.flat().filter(request => request && request.user);
        setRequests(validRequests);
      } catch (error) {
        setError('Failed to fetch requests');
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Requests</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <li key={index}>
              <p>User: {request.user.username}</p>
              <p>RUT: {request.user.rut}</p>
              <p>Email: {request.user.email}</p>
              <p>Description: {request.description}</p>
            </li>
          ))
        ) : (
          <p>No valid requests found.</p>
        )}
      </ul>
    </div>
  );
};

export default RequestList;
