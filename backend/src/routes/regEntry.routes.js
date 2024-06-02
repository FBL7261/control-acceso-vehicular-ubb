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
//--------------------------------------------------------------------------
// obtiene todas las entradas registradas
router.get("/", isGuard, regEntryController.getRegEntry);
//ruta para obtener una entrada por rut
router.get("/:rut", isGuard, regEntryController.getRegEntryByRut);
//ruta para obtener todas las entradas en cierta fecha
router.get("/:date", isGuard, regEntryController.getEntryByDate);
//ruta para obtener una entrada por placa
router.get("/:plate", isGuard, regEntryController.getRegEntryByPlate);
//ruta para crear una entrada que no sea de un usuario del sistema
router.post("/", isGuard, regEntryController.createRegEntry);
//ruta para crear una entrada de un usuario del sistema
router.post("/", regEntryController.createRegEntryUser);
//ruta para elimitar una entrada
router.delete("/:rut", isGuard, regEntryController.deleteRegEntryByRut);
//router.put("/:rut", isGuard, regEntryController.updateRegEntry);


// Exporta el enrutador
export default router;
