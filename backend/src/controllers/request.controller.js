import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import requestService from '../services/request.service.js';
import { requestBodySchema } from '../schema/request.schema.js';
import User from '../models/user.model.js';

// CREATE
export async function createRequest(req, res) {
    try {
        const email = req.email;  // Obteniendo el email del usuario autenticado
        const requestData = req.body;
        const { file } = req;

        const { error: bodyError } = requestBodySchema.validate(requestData);
        if (bodyError) {
            return respondError(req, res, 400, bodyError.message);
        }

        const [newRequest, requestError] = await requestService.createRequest(email, requestData, file);

        if (requestError) return respondError(req, res, 400, requestError);

        if (!newRequest) return respondError(req, res, 400, 'No se pudo crear la solicitud');

        respondSuccess(req, res, 200, newRequest);

    } catch (error) {
        handleError(error, 'request.controller -> createRequest');
        return respondError(req, res, 400, 'Error al crear la solicitud controller');
    }
}

// DELETE
export async function deleteRequest(req, res) {
    try {
        const requestId = req.params.id;
        const [deletedRequest, error] = await requestService.deleteRequest(requestId);
        if (error || !deletedRequest) {
            return respondError(req, res, 404, 'Solicitud no encontrada');
        }
        return respondSuccess(req, res, 200, 'Solicitud eliminada con éxito', deletedRequest);
    } catch (error) {
        handleError(error, 'request.controller -> deleteRequest');
        return respondError(req, res, 400, 'No se pudo eliminar la solicitud');
    }
}

// UPDATE
export async function updateRequest(req, res) {
    try {
        const { id } = req.params;
        const updateRequest = req.body;

        const [modifyRequest, requestError] = await requestService.updateRequest(id, updateRequest);

        if (requestError) return respondError(req, res, 400, requestError);

        if (!modifyRequest) return respondError(req, res, 404, 'No se pudo actualizar la solicitud');

        respondSuccess(req, res, 200, 'Solicitud actualizada con éxito', modifyRequest);

    } catch (error) {
        handleError(error, 'request.controller -> updateRequest');
        return respondError(req, res, 400, 'Error al actualizar la solicitud controller');
    }
}

// GET ALL
export async function getRequests(req, res) {
    try {
        const [requests, error] = await requestService.getRequests();
        if (error) {
            return respondError(req, res, 400, error);
        }
        const requestsWithPDFs = await Promise.all(
            requests.map(async (request) => {
                const user = await User.findOne({ email: request.email });
                if (!user) {
                    throw new Error("Usuario no encontrado para la solicitud");
                }
                const pdfs = await requestService.getPDFsForUser(user._id);  // Utiliza el ID del usuario para obtener los PDFs
                return { ...request.toObject(), pdfs };
            })
        );
        return respondSuccess(req, res, 200, requestsWithPDFs);
    } catch (error) {
        handleError(error, "request.controller -> getRequests");
        return respondError(req, res, 500, 'Error al obtener las solicitudes');
    }
}

// GET REQUEST BY ID
export async function getRequestByEmail(req, res) {
    try {
      const userEmail = req.email;
      const [requests, error] = await requestService.getRequestsByEmail(userEmail);
      if (error) {
        return respondError(req, res, 400, error);
      }
      return respondSuccess(req, res, 200, requests);
    } catch (error) {
      handleError(error, "request.controller -> getRequestByEmail");
      return respondError(req, res, 500, 'Error al obtener las solicitudes');
    }
  }

export async function updateRequestStatus(req, res) {
    const requestId = req.params.id;
    const newStatus = req.body.status;

    try {
        const request = await requestService.updateRequestStatus(requestId, newStatus);

        if (!request) {
            return respondError(req, res, 404, "Solicitud no encontrada");
        }

        return respondSuccess(req, res, request);
    } catch (error) {
        handleError(error, "request.controller -> updateRequestStatus");
        return respondError(req, res, 500, "Error al actualizar el estado de la solicitud");
    }
}
