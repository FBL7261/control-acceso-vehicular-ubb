import React from 'react';
import VehicleCard from './VehicleCard';

const VehicleList = ({ vehicles, onDelete, onUpdate }) => {
  return (
    <div>
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle._id} vehicle={vehicle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default VehicleList;