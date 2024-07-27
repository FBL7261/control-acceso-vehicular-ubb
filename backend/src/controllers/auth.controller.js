"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import AuthService from "../services/auth.service.js";
import { authLoginBodySchema } from "../schema/auth.schema.js";

/**
 * Inicia sesión con un usuario.
 * @async
 * @function login
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function login(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = authLoginBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const { email, password } = body;
    const user = { email, password };

    const [accessToken, refreshToken, errorToken] = await AuthService.login(user);
    if (errorToken) return respondError(req, res, 400, errorToken);

    // * Existen más opciones de seguridad para las cookies *//
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    respondSuccess(req, res, 200, { accessToken });
  } catch (error) {
    handleError(error, "auth.controller -> login");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Cierra la sesión del usuario.
 * @async
 * @function logout
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");
    res.clearCookie("jwt", { httpOnly: true });
    respondSuccess(req, res, 200, { message: "Sesión cerrada correctamente" });
  } catch (error) {
    handleError(error, "auth.controller -> logout");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Refresca el token de acceso.
 * @async
 * @function refresh
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function refresh(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");

    const [accessToken, errorToken] = await AuthService.refresh(cookies);
    if (errorToken) return respondError(req, res, 400, errorToken);

    respondSuccess(req, res, 200, { accessToken });
  } catch (error) {
    handleError(error, "auth.controller -> refresh");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Obtiene el perfil del usuario.
 * @async
 * @function profile
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function profile(req, res) {
  try {
    console.log("Email en el controlador:", req.email); // Añade este log
    const userProfile = await AuthService.getProfile(req.email);
    if (!userProfile) return respondError(req, res, 404, "Perfil no encontrado");
    respondSuccess(req, res, 200, userProfile);
  } catch (error) {
    handleError(error, "auth.controller -> profile");
    respondError(req, res, 400, error.message);
  }
}

export default {
  login,
  logout,
  refresh,
  profile,
};