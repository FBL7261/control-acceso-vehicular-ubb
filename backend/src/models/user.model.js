"use strict";
// Importar el modulo 'mongoose' para crear una conexion de base de datos
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Crear el esquema de colección de 'Users'
const userSchema = new mongoose.Schema(
  {
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
  },
  {
    versionKey: false,
  },
);

/** Encriptar contraseña de usuario/s */
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/** Comparar contraseña de usuario/s */
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

/** 'User' data model */
const User = mongoose.model("User", userSchema);

// Exportar el modelo de data de 'User'
export default User;
