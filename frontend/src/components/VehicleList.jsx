// src/components/VehicleList.jsx

import React from 'react';

function VehicleList({ vehicles = [], onDelete, onEdit }) {
  return (
    <div>
      <h2>Vehículos</h2>
      <ul>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <li key={vehicle._id}>
              <p>Matrícula: {vehicle.matricula}</p>
              <p>Modelo: {vehicle.modelo}</p>
              <p>Marca: {vehicle.marca}</p>
              <p>Color: {vehicle.color}</p>
              {vehicle.foto && <img src={vehicle.foto} alt={vehicle.modelo} />}
              <button onClick={() => onEdit(vehicle)}>Editar</button>
              <button onClick={() => onDelete(vehicle._id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay vehículos disponibles.</p>
        )}
      </ul>
    </div>
  );
}

export default VehicleList;
