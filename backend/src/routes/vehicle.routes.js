"use strict";
import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js"; 
import { upload } from "../middlewares/archive.middleware.js";

const router = Router();

// Uso del middleware de autenticación
router.use(authenticationMiddleware);
// Crear vehículo con o sin foto
router.post("/", upload.fields([{ name: 'foto', maxCount: 1 }]), vehicleController.createVehicle);
// Obtener todos los vehículos por id del usuario en sesion actual
router.get("/user/:userId", vehicleController.getVehiclesByUser);
// Eliminar vehículo el usuario dueño o un administrador
router.delete("/:vehicleId", vehicleController.deleteVehicle);
// Actualizar un vehículo por su ID
router.put("/:vehicleId", upload.fields([{ name: 'foto', maxCount: 1 }]), vehicleController.updateVehicle);

export default router;