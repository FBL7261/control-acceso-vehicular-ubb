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
//ruta para crear una entrada que no sea de un usuario del sistema
router.post("/", isGuard, regEntryController.createRegEntry);
//ruta para crear una entrada de un usuario del sistema
router.post("/regEntryUser", isGuard, regEntryController.createRegEntryUser);
// obtiene todas las entradas registradas
router.get("/", isGuard, regEntryController.getRegEntry);
//ruta para obtener todas las entradas en cierta fecha
router.get("/date/:date", isGuard, regEntryController.getEntryByDate);
//ruta para obtener una entrada por placa
router.get("/plate/:plate", isGuard, regEntryController.getRegEntryByPlate);
//ruta para obtener una entrada por rut
router.get("/:id", isGuard, regEntryController.getRegEntryById);
//ruta para actualizar una entrada
//router.patch("/update/:id", isGuard, regEntryController.updateRegEntryById);
//ruta para elimitar una entrada
router.delete("/delete/:id", isGuard, regEntryController.deleteRegEntryById);


// Exporta el enrutador
export default router;