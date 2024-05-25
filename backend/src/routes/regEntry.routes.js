"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";
// Importa el controlador de entradas
import regEntryController from "../controllers/regEntry.controller.js";
// Importa el middleware de autenticación
import { isGuard } from "../middlewares/authorization.middleware.js";
// Importa el middleware de autenticación
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

// Instancia del enrutador
const router = Router();
// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);
// Define las rutas para las entradas
router.get("/", isGuard, regEntryController.getRegEntry);
router.get("/:rut", isGuard, regEntryController.getRegEntryByRut);
router.get("/date/:date", isGuard, regEntryController.getEntryByDate);
router.post("/", isGuard, regEntryController.createRegEntry);
//router.put("/:rut", isGuard, regEntryController.updateRegEntry);
//router.delete("/:rut", isGuard, regEntryController.deleteRegEntry);

// Exporta el enrutador
export default router;
