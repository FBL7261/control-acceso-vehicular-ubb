import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({

  matricula: {
    type: String,
    required: true,
    unique: true,
  },

  modelo: {
    type: String,
    required: true,
  },

  marca: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  foto: {
    type: String,
    required: false,
  },

  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

vehicleSchema.pre("save", function(next) {
  const vehicle = this;
  if (vehicle.isModified("matricula")) {
    vehicle.matricula = formatMatricula(vehicle.matricula);
  }
  next();
});

function formatMatricula(matricula) {
  return matricula.slice(0, 2) + "." + matricula.slice(2, 4) + "." + matricula.slice(4);
}

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;