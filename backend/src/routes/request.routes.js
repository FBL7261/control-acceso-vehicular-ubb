import { Router } from "express";
const router = Router();

import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import upload from "../middlewares/handleMulter.middlewares.js";
import {
  createRequest,
  deleteRequest,
  updateRequest,
  getRequests,
  updateRequestStatus,
  getRequestsByUserEmail,
  getRequestById,
  getPDFsByRequestId,
} from "../controllers/request.controller.js";

router.use(authenticationMiddleware);

// Ruta para crear una solicitud
router.post('/', upload.single('pdf'), createRequest);

// Ruta para eliminar una solicitud (requiere privilegios de administrador)
router.delete('/:id', isAdmin, deleteRequest);

// Ruta para actualizar una solicitud
router.put('/:id', updateRequest);

// Ruta para obtener todas las solicitudes (requiere privilegios de administrador)
router.get('/', isAdmin, getRequests);

// Ruta para actualizar el estado de una solicitud (requiere privilegios de administrador)
router.put('/:id/status', isAdmin, updateRequestStatus);

// Ruta para obtener las solicitudes de un usuario específico
router.get('/user', getRequestsByUserEmail);

// Ruta para obtener una solicitud específica por ID
router.get('/:id', getRequestById);

// Ruta para obtener los PDFs de una solicitud específica
router.get('/pdfs/:requestId', getPDFsByRequestId);

export default router;
