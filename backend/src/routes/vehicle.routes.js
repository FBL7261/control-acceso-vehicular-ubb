import { Router } from "express";
const router = Router();

import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import vehicleController from "../controllers/vehicle.controller.js"; // Controlador de vehículos

// Usa el middleware de autenticación
router.use(authenticationMiddleware);

// Define las rutas para vehículos
router.post("/", vehicleController.createVehicle); // Crear vehículo
router.get("/user/:userId", vehicleController.getVehiclesByUser); // Obtener vehículos por usuario
router.delete("/:vehicleId", vehicleController.deleteVehicle); // Eliminar vehículo por ID

export default router;
