import { Router } from "express";
const router = Router();

import credentialsController from "../controllers/credential.controller.js";

router.post("/", credentialsController.createCredentials);
router.put("/:id", credentialsController.updateCredentials);
router.get("/", credentialsController.getAllCredentials);
router.get("/:id", credentialsController.getOneCredential);
router.delete("/:id", credentialsController.deleteCredential);

export default router;