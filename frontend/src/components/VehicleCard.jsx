import React from 'react';
import PropTypes from 'prop-types';

const VehicleCard = ({ vehicle, onDelete, onUpdate }) => {
  const { _id, licensePlate, imageUrl } = vehicle;

  const handleDelete = () => {
    onDelete(_id);
  };

  const handleUpdate = () => {
    onUpdate(vehicle);
  };

  return (
    <div className="vehicle-card">
      <img src={imageUrl} alt={licensePlate} />
      <div className="vehicle-info">
        <h3>{licensePlate}</h3>
        <div className="actions">
          <button onClick={handleUpdate}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VehicleCard;