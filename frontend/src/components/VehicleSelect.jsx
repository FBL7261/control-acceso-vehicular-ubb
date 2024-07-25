import React from 'react';

const VehicleSelect = ({ vehicles, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Selecciona una matrícula</option>
      {vehicles.map(vehicle => (
        <option key={vehicle._id} value={vehicle._id}>
          {vehicle.matricula}
        </option>
      ))}
    </select>
  );
};

export default VehicleSelect;