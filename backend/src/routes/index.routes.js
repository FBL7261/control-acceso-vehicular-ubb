"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

//Enrutador de Cristopher
import vehicleRoutes from "./vehicle.routes.js"; // Rutas para vehículos

//Enrutador de Johan
import entryRoutes from "./regEntry.routes.js"; // Rutas para entradas

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
//Rutas de Johan
router.use("/RegEntry", authenticationMiddleware, entryRoutes);
//Rutas de Cristopher
router.use("/vehicles", authenticationMiddleware, vehicleRoutes);

// Exporta el enrutador
export default router;
