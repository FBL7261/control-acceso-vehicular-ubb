const express = require('express');

const requestController = require('../controllers/request.controller');

const authenticationMiddleware = require('../middlewares/authentication.middleware');
const authorizationMiddleware = require('../middlewares/authorization.middleware');

const router = express.Router();

router.use(authenticationMiddleware);

router.post('/', requestController.createRequest);
router.delete('/:id', authorizationMiddleware, requestController.deleteRequest);
router.put('/:id', authorizationMiddleware, requestController.updateRequest);
router.get('/', authorizationMiddleware, requestController.getRequests);
router.get('/:id', authorizationMiddleware, requestController.getRequestById);

module.exports = router;