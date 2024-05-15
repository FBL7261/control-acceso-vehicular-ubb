"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

//Enrutador de Felipe
import requestRoutes from "./request.routes.js";
import pdfRoutes from "./pdf.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

//Rutas de Felipe
/*------------------------------------*/
//Ruta de Request
router.use("/requests", authenticationMiddleware, requestRoutes);
//Ruta de PDF
router.use("/pdf", authenticationMiddleware, pdfRoutes);

// Exporta el enrutador
export default router;
