import mongoose from 'mongoose';

// Define el esquema del vehículo
const vehicleSchema = new mongoose.Schema({
  // Campo para la patente del vehículo
  plate: {
    type: String,
    required: true,
    unique: true,
  },
  // Campo para el modelo del vehículo
  model: {
    type: String,
    required: true,
  },
  // Campo para la marca del vehículo
  brand: {
    type: String,
    required: true,
  },
  // Campo para el color del vehículo
  color: {
    type: String,
    required: true,
  },
  // Campo para la foto del vehículo (opcional)
  photo: {
    type: String,
    required: false,
  },
  // Referencia al usuario propietario del vehículo
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Crea el modelo del vehículo con el esquema definido
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
