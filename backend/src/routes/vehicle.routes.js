import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { upload } from "../middlewares/archive.middleware.js";

const router = Router();

// Aplicar autenticación a todas las rutas
router.use(authenticationMiddleware);

// Crear vehículo
router.post("/", upload.fields([{ name: 'foto', maxCount: 1 }]), vehicleController.createVehicle);

// Obtener todos los vehículos por id del usuario en sesión actual
router.get("/user/:userId", vehicleController.getVehiclesByUser);

// Eliminar vehículo
router.delete("/:vehicleId", vehicleController.deleteVehicle);

// Actualizar un vehículo
router.put("/:vehicleId", upload.fields([{ name: 'foto', maxCount: 1 }]), vehicleController.updateVehicle);

export default router;
