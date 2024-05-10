"use strict";
import { Router } from "express";

// Controlador de vehículos
import vehicleController from "../controllers/vehicle.controller.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

// Middleware de autorización para roles específicos
import { isAdmin } from "../middlewares/authorization.middleware.js"; 


const router = Router();

// Uso del middleware de autenticación
router.use(authenticationMiddleware);

// Rutas para vehículos

// Crear vehículo
router.post("/", vehicleController.createVehicle);

// Obtener todos los vehículos por id del usuario en sesion actual
router.get("/user/:userId", vehicleController.getVehiclesByUser);

// Eliminar vehículo el usuario dueño o un administrador
router.delete("/:vehicleId", vehicleController.deleteVehicle);

// Actualizar un vehículo por su ID
router.put("/:vehicleId", vehicleController.updateVehicle);

export default router;
