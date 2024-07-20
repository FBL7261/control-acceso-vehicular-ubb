import { Router } from "express";
const router = Router();

import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import upload from "../middlewares/handleMulter.middlewares.js";
import {
  createRequest,
  deleteRequest,
  updateRequest,
  getRequests,
  getRequestsByEmail, // Asegúrate de importar la función correcta
  updateRequestStatus,
} from "../controllers/request.controller.js";

router.use(authenticationMiddleware);

router.post('/', upload.single('pdf'), createRequest);
router.delete('/:id', deleteRequest);
router.put('/:id', updateRequest);
router.get('/', getRequests);
router.get('/user/:email', getRequestsByEmail); // Ruta para obtener solicitudes por email
router.put('/newstate/:id', updateRequestStatus);

export default router;
