import { Router } from "express";
const router = Router();

import upload from "../middlewares/handleMulter.middlewares.js";
import pdfController from "../controllers/pdf.controller.js";

// Ruta para crear un PDF
router.post("/:id", upload.single('pdf'), pdfController.createPDF);

// Ruta para obtener un PDF específico
router.get("/", pdfController.getPDF);

// Ruta para obtener los PDFs asociados a una solicitud específica
router.get("/request/:requestId", pdfController.getPDFsForRequest);

// Ruta para eliminar un PDF específico
router.delete("/:id", pdfController.deletePDF);

export default router;
