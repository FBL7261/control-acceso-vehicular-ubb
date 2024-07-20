import { Router } from "express";
const router = Router();

import authenticationMiddleware from "../middlewares/authentication.middleware.js";

import requestController from '../controllers/request.controller.js';

router.use(authenticationMiddleware);

router.post('/',requestController.createRequest);
router.delete('/:id',requestController.deleteRequest);
router.put('/:id',requestController.updateRequest);
router.get('/', requestController.getRequests);
router.get('/:id',requestController.getRequestById);

export default router;