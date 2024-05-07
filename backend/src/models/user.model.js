"use strict";
// Importar el módulo 'mongoose' para crear la conexión con la base de datos
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle", // Referencia al modelo de vehículos
    },
  ],
}, {
  versionKey: false,
});

// Métodos para encriptar y comparar contraseñas
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = (password, receivedPassword) => {
  return bcrypt.compare(password, receivedPassword);
};

// Crear el modelo de usuario
const User = mongoose.model("User", userSchema);

export default User;
