// VehicleCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const VehicleCard = ({ vehicle, onDelete }) => {
  const { _id, licensePlate, imageUrl } = vehicle;

  const handleDelete = () => {
    onDelete(_id);
  };

  return (
    <div className="vehicle-card">
      <img src={imageUrl} alt={licensePlate} />
      <div className="vehicle-info">
        <h3>{licensePlate}</h3>
        <div className="actions">
          <Link to={`/vehicles/${_id}/edit`}>Editar</Link>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default VehicleCard;
