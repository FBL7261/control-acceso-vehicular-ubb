"use strict";
import { Router } from "express";

// Controlador de vehículos
import vehicleController from "../controllers/vehicle.controller.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

// Middleware de autorización para roles específicos
import { isAdmin } from "../middlewares/authorization.middleware.js"; 
import { upload } from "../middlewares/archive.middleware.js";

const router = Router();

// Uso del middleware de autenticación
router.use(authenticationMiddleware);

// Rutas para vehículos

// Crear vehículo
router.post("/", upload.fields([{ name: 'foto', maxCount: 1 }]), vehicleController.createVehicle);

// Obtener todos los vehículos por id del usuario en sesion actual
router.get("/user/:userId", vehicleController.getVehiclesByUser);

// Eliminar vehículo el usuario dueño o un administrador
router.delete("/:vehicleId", vehicleController.deleteVehicle);

// Actualizar un vehículo por su ID
router.put("/:vehicleId", upload.fields([{ name: 'foto', maxCount: 1 }]), vehicleController.updateVehicle);

export default router;