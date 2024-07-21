"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import AuthService from "../services/auth.service.js";

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = { email, password };
    const tokens = await AuthService.login(user);
    respondSuccess(req, res, 200, tokens);
  } catch (error) {
    handleError(error, "auth.controller -> login");
    respondError(req, res, 400, error.message);
  }
}

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
