import { Router } from "express";
const router = Router();

import upload from "../middlewares/handleMulter.middlewares.js";
import pdfController from "../controller/pdf.controller.js";

router.post("/:id", upload.single('pdf'), pdfController.createPDF);
router.get("/", pdfController.getPDF);
router.get("/:personId", pdfController.getPDFsForPerson);
router.delete("/:id", pdfController.deletePDF);

export default router;