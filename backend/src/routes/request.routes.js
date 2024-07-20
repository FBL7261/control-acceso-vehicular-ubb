import { Router } from "express";
const router = Router();

import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import upload from "../middlewares/handleMulter.middlewares.js";
import requestController from '../controllers/request.controller.js';

router.use(authenticationMiddleware);

// La ruta para crear una solicitud ahora también maneja la subida de archivos PDF
router.post('/', upload.single('pdf'), requestController.createRequest);
router.delete('/:id', requestController.deleteRequest);
router.put('/:id', requestController.updateRequest);
router.get('/', requestController.getRequests);
router.get('/user/:id', requestController.getRequestsByUserId);
router.put('/newstate/:id', requestController.updateRequestStatus);

export default router;
