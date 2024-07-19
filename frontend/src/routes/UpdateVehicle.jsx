import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicle.service'; // Asegúrate de tener el servicio adecuado

const UpdateVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    licensePlate: '',
    model: '',
    brand: '',
    color: '',
    photo: null,
  });

  useEffect(() => {
    // Aquí podrías cargar los vehículos del usuario actual
    // setVehicles(response.data);
  }, []);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      licensePlate: vehicle.licensePlate,
      model: vehicle.model,
      brand: vehicle.brand,
      color: vehicle.color,
      photo: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      await vehicleService.updateVehicle(selectedVehicle._id, formDataToSend);
      alert('Vehículo actualizado con éxito');
    } catch (error) {
      console.error('Error actualizando vehículo:', error);
    }
  };

  return (
    <div>
      <h1>Actualizar Vehículo</h1>
      <select onChange={(e) => handleSelectVehicle(vehicles.find(v => v._id === e.target.value))}>
        {vehicles.map(vehicle => (
          <option key={vehicle._id} value={vehicle._id}>{vehicle.licensePlate}</option>
        ))}
      </select>
      {selectedVehicle && (
        <form onSubmit={handleSubmit}>
          <label>
            Placa:
            <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required />
          </label>
          <label>
            Modelo:
            <input type="text" name="model" value={formData.model} onChange={handleChange} required />
          </label>
          <label>
            Marca:
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
          </label>
          <label>
            Color:
            <input type="text" name="color" value={formData.color} onChange={handleChange} required />
          </label>
          <label>
            Foto:
            <input type="file" name="photo" onChange={handleChange} />
          </label>
          <button type="submit">Actualizar Vehículo</button>
        </form>
      )}
    </div>
  );
};

export default UpdateVehicle;
