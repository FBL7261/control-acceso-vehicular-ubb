"use strict";

import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { upload } from "../middlewares/archive.middleware.js";

const router = Router();


router.use(authenticationMiddleware);
router.post("/", upload.fields([{ name: 'foto', maxCount: 1 }]), vehicleController.createVehicle);
router.get("/user/:userId", vehicleController.getVehiclesByUser);
router.get("/:vehicleId", vehicleController.getVehicleById);
router.delete("/:vehicleId", vehicleController.deleteVehicle);
router.put("/:vehicleId", upload.fields([{ name: 'foto', maxCount: 1 }]), vehicleController.updateVehicle);

export default router;
