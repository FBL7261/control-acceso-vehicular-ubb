"use strict";

import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { upload } from "../middlewares/archive.middleware.js";

const router = Router();

router.use(authenticationMiddleware);
router.post("/", upload.fields([{ name: "foto", maxCount: 1 }]), vehicleController.createVehicle);
router.get("/user/:userId", vehicleController.getVehiclesByUser);
router.delete("/:vehicleId", vehicleController.deleteVehicle);
router.get("/models", vehicleController.getVehicleModels);
router.put("/:vehicleId", vehicleController.updateVehicle);
router.get("/model/:modelName", vehicleController.getVehicleByModel);
router.put("/model/:modelName", vehicleController.updateVehicleByModel);
export default router;