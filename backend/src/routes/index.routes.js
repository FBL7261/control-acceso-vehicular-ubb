"use strict";
// Importa el módulo 'express' para crear las rutas
import { Router } from "express";

// Importa todos los enrutadores necesarios
import userRoutes from "./user.routes.js"; // Rutas para usuarios
import authRoutes from "./auth.routes.js"; // Rutas para autenticación
import requestRoutes from "./request.routes.js"; // Rutas para requests
import vehicleRoutes from "./vehicle.routes.js"; // Rutas para vehículos

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js"; 

/** Instancia del enrutador */
const router = Router(); // Crea una instancia del enrutador de Express

// Define las rutas para los usuarios
router.use("/users", authenticationMiddleware, userRoutes); // Autenticación requerida para usuarios

// Define las rutas para la autenticación
router.use("/auth", authRoutes); // Rutas para autenticación no requieren autenticación previa

// Define las rutas para requests
// Autenticación requerida para requests
router.use("/requests", authenticationMiddleware, requestRoutes);

// Define las rutas para vehículos
// Autenticación requerida para vehículos
router.use("/vehicles", authenticationMiddleware, vehicleRoutes);

// Exporta el enrutador para su uso en la aplicación principal
export default router;
