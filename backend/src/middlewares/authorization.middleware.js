"use strict";

import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Comprueba si el usuario tiene el rol de administrador
 */
async function isAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return respondError(
        req,
        res,
        404,
        "Usuario no encontrado",
        "El usuario autenticado no existe",
      );
    }

    const roles = await Role.find({ _id: { $in: user.roles } });

    const hasAdminRole = roles.some(role => role.name === "admin");

    if (hasAdminRole) {
      next(); // Continuar si el usuario es administrador
    } else {
      return respondError(
        req,
        res,
        403,
        "Se requiere rol de administrador",
      );
    }
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
    respondError(req, res, 500, "Error de autorización");
  }
}

export { isAdmin };
