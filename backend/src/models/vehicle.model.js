import mongoose from "mongoose";

// Define el esquema del vehículo
const vehicleSchema = new mongoose.Schema({
  // Campo para la matrícula del vehículo
  matricula: {
    type: String,
    required: true,
    unique: true,
  },
  // Campo para el modelo del vehículo
  modelo: {
    type: String,
    required: true,
  },
  // Campo para la marca del vehículo
  marca: {
    type: String,
    required: true,
  },
  // Campo para el color del vehículo
  color: {
    type: String,
    required: true,
  },
  // Campo para la foto del vehículo (opcional)
  foto: {
    type: String,
    required: false,
  },
  // Referencia al usuario propietario del vehículo
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Middleware para formatear la matrícula antes de guardar
vehicleSchema.pre('save', function(next) {
  const vehicle = this;
  if (vehicle.isModified('matricula')) {
    vehicle.matricula = formatMatricula(vehicle.matricula);
  }
  next();
});

// Función para formatear la matrícula
function formatMatricula(matricula) {
  // Formato: XX.XX.XX
  return matricula.slice(0, 2) + '.' + matricula.slice(2, 4) + '.' + matricula.slice(4);
}

// Crea el modelo del vehículo con el esquema definido
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
