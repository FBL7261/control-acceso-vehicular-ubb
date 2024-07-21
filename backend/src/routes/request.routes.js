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
  getRequestsByUserEmail   ,
} from "../controllers/request.controller.js";

router.use(authenticationMiddleware);

router.post('/', upload.single('pdf'), createRequest);
router.delete('/:id', isAdmin, deleteRequest);
router.put('/:id', updateRequest);
router.get('/', isAdmin, getRequests);
router.put('/:id/status',  isAdmin, updateRequestStatus);
router.get('/user', getRequestsByUserEmail   );

export default router;
