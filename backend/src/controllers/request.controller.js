import { respondSuccess, respondError } from "../utils/resHandler.js";
import  {handleError}  from "../utils/errorHandler.js";
import requestService from '../services/request.service.js';
import {requestBodySchema} from '../schema/request.schema.js';

// CREATE
async function createRequest(req, res) {
    try {

        const {email} = req;

        const requestData = req.body;

        const { error: bodyError } = requestBodySchema.validate(requestData);
        if (bodyError) {
            return respondError(req, res, 400, bodyError.message);
        }

        const [newRequest, requestError] = await requestService.createRequest(email, requestData);

        if (requestError) return respondError(req, res, 400, requestError);

        if (!newRequest) return respondError(req, res, 400, 'No se pudo crear la solicitud');

        respondSuccess(req, res, 200, newRequest);

    }catch (error) {
        handleError(error, 'request.controller -> createRequest');
        return respondError(req, res, 400, 'Error al crear la solicitud controller');
    }
};


// DELETE
async function deleteRequest(req, res) {
    try {
        // Obtiene el ID de la solicitud de los parámetros de la URL
        const requestId = req.params.id;
        const deletedRequest = await requestService.deleteRequest(requestId);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }
        res.status(200).json({ 
            message: 'Solicitud eliminada con éxito',
            data: deletedRequest,
        });
    } catch (error) {
        res.status(400).json({ message: 'No se pudo eliminar la solicitud', error: error.message });
    }
}


// UPDATE
async function updateRequest(req,res) {

    try {
        // Obtiene el ID de la solicitud de los parámetros de la URL
        const {id} = req.params;
        const updateRequest = req.body;

        const [modifyRequest, requestError] = await requestService.updateRequest(id, updateRequest);

        if (requestError) return respondError(req, res, 400, requestError);

        if (!modifyRequest) return respondError(req, res, 404, 'No se pudo actualizar la solicitud');
        
        respondSuccess(req, res, 200, 'Solicitud actualizada con éxito');

    }catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al actualizar la solicitud controller' });
      }
      
}

// GET ALL
async function getRequests(req, res) {
    try {
        // Obtiene todas las solicitudes
        const requests = await requestService.getRequests();
        if (!requests) {
            return res.status(404).json({ message: 'No se encontraron solicitudes' });
        }
        res.status(200).json(requests);
    } catch (error) {

        handleError(error, 'request.controller -> getRequests');
        res.status(500).json({ message: 'Error al obtener las solicitudes controller' });
    }
}

// GET BY ID
async function getRequestById(req,res) {

    try {
        // Obtiene el ID de la solicitud de los parámetros de la URL
        const {params} = req;
        const {id} = params;
        const [requestFound, requestError] = await requestService.getRequestById(id);

        if (requestError) return respondError(req, res, 400, requestError);

        if (!requestFound) return respondError(req, res, 400, 'No se encontró la solicitud');

        respondSuccess(req, res, 201, {
            message: 'Solicitud encontrada con éxito',
            data: requestFound,
        });

    }catch(error){
        handleError(error, 'request.controller -> getRequestById');
        return respondError(req, res, 400, 'Error al obtener la solicitud por id controller');
    }


}

async function updateRequestStatus(req, res) {
    // Obtiene el ID de la solicitud de los parámetros de la URL
    const requestId = req.params.id;
    const newStatus = req.body.status;

    try {
        const request = await Request.findByIdAndUpdate(requestId, { status: newStatus }, { new: true });

        if (!request) {
            return respondError(req, res, 404, "Solicitud no encontrada");
        }

        return respondSuccess(req, res, request);
    } catch (error) {
        handleError(error, "request.controller -> updateRequestStatus");
        return respondError(req, res, 500, "Error al actualizar el estado de la solicitud");
    }
}


export default {
    createRequest,
    deleteRequest,
    updateRequest,
    getRequests,
    getRequestById,
    updateRequestStatus,
};