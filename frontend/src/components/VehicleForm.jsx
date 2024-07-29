import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vehicleService from '../services/vehicle.service';
import '../styles/VehicleForm.css';

function VehicleForm({ onSubmit, initialData = {} }) {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    matricula: initialData.matricula || '',
    modelo: initialData.modelo || '',
    marca: initialData.marca || '',
    color: initialData.color || '',
    foto: initialData.foto || null,
  });

  const [addPhoto, setAddPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVehicle((prev) => ({ ...prev, foto: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const vehicleData = { ...vehicle };
      if (!vehicle.foto) {
        delete vehicleData.foto;
      }
      await vehicleService.createVehicle(vehicleData);
      if (onSubmit) onSubmit();
    } catch (error) {
      setError("Error en subir vehiculo.");
      console.error("Error en subir vehiculo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vehicle-form-background">
      <div className="vehicle-form-wrapper">
        <div className="vehicle-form-body">
          <div className="vehicle-form-container">
            <a href="/vehicles" className="go-back">← Volver</a> {/* Go back arrow */}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="vehicle-form">
              <div>
                <label>Matrícula</label>
                <input
                  placeholder='Ej: ZK32T2'
                  type="text" name="matricula" value={vehicle.matricula} onChange={handleChange} required />
              </div>
              <div>
                <label>Modelo</label>
                <input
                  placeholder='Ford Focus'
                  type="text" name="modelo" value={vehicle.modelo} onChange={handleChange} required />
              </div>
              <div>
                <label>Marca:</label>
                <input
                  placeholder='Toyota, etc'
                  type="text" name="marca" value={vehicle.marca} onChange={handleChange} required />
              </div>
              <div>
                <label>Color:</label>
                <input
                  placeholder='Rojo' 
                  type="text" name="color" value={vehicle.color} onChange={handleChange} required />
              </div>
              <div className="checkbox-container">
                <label>
                  <input type="checkbox" checked={addPhoto} onChange={(e) => setAddPhoto(e.target.checked)} />
                  Añadir Foto
                </label>
                {addPhoto && (
                  <div>
                    <label>Subir Foto Vehículo:</label>
                    <input type="file" name="foto" onChange={handleFileChange} />
                  </div>
                )}
              </div>
              <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleForm;