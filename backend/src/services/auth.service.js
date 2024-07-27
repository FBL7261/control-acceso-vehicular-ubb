"use strict";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from '../config/configEnv.js';
import { handleError } from '../utils/errorHandler.js';
import User from '../models/user.model.js';

/**
 * Inicia sesión con un usuario.
 * @async
 * @function login
 * @param {Object} user - Objeto de usuario
 */
async function login(user) {
  try {
    const { email, password } = user;
    const userFound = await User.findOne({ email }).populate("roles").exec();
    
    if (!userFound) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    

    const accessToken = jwt.sign(
      {
        userId: userFound._id,
        email: userFound.email,
        roles: userFound.roles.map((role) => role.name),
      },
      ACCESS_JWT_SECRET,
      { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
      { email: userFound.email },
      REFRESH_JWT_SECRET,
      { expiresIn: '7d' }
    );

    return [accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> login");
    throw error;
  }
}

/**
 * Refresca el token de acceso
 * @async
 * @function refresh
 * @param {Object} cookies - Objeto de cookies
 */
async function refresh(cookies) {
  try {
    if (!cookies.jwt) return [null, "No hay autorización"];
    const refreshToken = cookies.jwt;

    const [accessToken, errorToken] = await jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, user) => {
        if (err) return [null, "La sesion a caducado, vuelva a iniciar sesion"];

        const userFound = await User.findOne({ email: user.email })
          .populate("roles")
          .exec();

        if (!userFound) return [null, "Usuario no autorizado"];

        const accessToken = jwt.sign(
          { userId: userFound._id, email: userFound.email, roles: userFound.roles.map((role) => role.name) },
          ACCESS_JWT_SECRET,
          { expiresIn: '1d' }
        );

        return [accessToken, null];
      },
    );

    return accessToken;
  } catch (error) {
    handleError(error, "auth.service -> refresh");
  }
}

/**
 * Obtiene el perfil del usuario.
 * @async
 * @function getProfile
 * @param {string} email - Correo electrónico del usuario
 */
async function getProfile(email) {
  try {
    console.log("Buscando perfil para el email:", email);
    const userFound = await User.findOne({ email })
      .populate("roles")
      .exec();
    if (!userFound) {
      console.log("Usuario no encontrado para el email:", email);
      return null;
    }

    const { username, rut, roles } = userFound;
    return { username, rut, roles };
  } catch (error) {
    handleError(error, "auth.service -> getProfile");
    return null;
  }
}

export default { login, refresh, getProfile };
