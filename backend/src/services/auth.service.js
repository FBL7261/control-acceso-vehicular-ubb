"use strict";
/** Modulo 'jsonwebtoken' para crear tokens */
import jwt from "jsonwebtoken";

import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../config/configEnv.js";
import { handleError } from "../utils/errorHandler.js";
import User from "../models/user.model.js";

/**
 * Inicia sesión con un usuario.
 * @async
 * @function login
 * @param {Object} user - Objeto de usuario
 */
async function login(user) {
  try {
    const userFound = await User.findOne({ email: user.email }).populate("roles").exec();
    if (!userFound) {
      throw new Error("Usuario no encontrado");
    }

    if (!Array.isArray(userFound.roles)) {
      throw new Error("Los roles del usuario no son un arreglo");
    }

    const accessToken = jwt.sign(
      {
        email: userFound.email,
        roles: userFound.roles.map((role) => role.name),
      },
      ACCESS_JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Token generado:", accessToken); // Añadir log para verificar el token generado

    return { accessToken };
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

    const accessToken = await jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, user) => {
        if (err) return [null, "La sesion a caducado, vuelva a iniciar sesion"];

        const userFound = await User.findOne({
          email: user.email,
        })
          .populate("roles")
          .exec();

        if (!userFound) return [null, "No usuario no autorizado"];

        const accessToken = jwt.sign(
          { email: userFound.email, roles: userFound.roles },
          ACCESS_JWT_SECRET,
          {
            expiresIn: "1d",
          },
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
    console.log("Buscando perfil para el email:", email); // Añade este log
    const userFound = await User.findOne({ email: email })
      .populate("roles")
      .exec();
    if (!userFound) {
      console.log("Usuario no encontrado para el email:", email); // Añade este log
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