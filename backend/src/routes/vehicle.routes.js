import { Router } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import vehicleController from "../controllers/vehicle.controller.js"; // Controlador de vehículos
import { isAdmin } from "../middlewares/authorization.middleware.js"; // Middleware de autorización para roles específicos

const router = Router();

// Uso del middleware de autenticación
router.use(authenticationMiddleware);

// Rutas para vehículos
router.post("/", vehicleController.createVehicle); // Crear vehículo
router.get("/user/:userId", vehicleController.getVehiclesByUser); // Obtener vehículos por usuario
router.delete("/:vehicleId", isAdmin, vehicleController.deleteVehicle); // Eliminar vehículo, solo para administradores

export default router;
