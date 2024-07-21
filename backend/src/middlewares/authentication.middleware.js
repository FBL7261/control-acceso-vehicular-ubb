"use strict";

import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "../config/configEnv.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return respondError(
        req,
        res,
        401,
        "No autorizado",
        "Token no válido",
      );
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) return respondError(req, res, 403, "Token no válido");
      req.email = decoded.email; // Correo del usuario autenticado
      req.roles = decoded.roles; // Roles del usuario
      next();
    });
  } catch (error) {
    handleError(error, "authentication.middleware -> verifyJWT");
    respondError(req, res, 500, "Error de autenticación");
  }
};

export default verifyJWT;
