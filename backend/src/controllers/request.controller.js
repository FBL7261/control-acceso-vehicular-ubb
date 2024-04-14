const { respondSucess, respondError } = require('../utils/response.util');
const { handleError } = require('../utils/error.util');
const requestService = require('../services/request.service');

// CREATE
async function createRequest(req,res) {

    try {
        const {email} = req;
        const requestData = req.body;
        const [newRequest, requestError] = await requestService.createRequest(email, requestData);

        if (requestError) return respondError(req, res, 400, requestError);

        if (!newRequest) return respondError(req, res, 404, 'No se pudo crear la solicitud');

        respondSucess(req, res, newRequest, 200, 'Solicitud creada con éxito')

    }catch(error){
        handleError(error, 'request.controller -> createRequest');
        return respondError(req, res, 500, 'Error al crear la solicitud');
    }
};
// DELETE
async function deleteRequest(req,res) {
    try {
        const {body} = req;
        const [requestDeleted, requestError] = await requestService.deleteRequest(body.id);

        if (requestError) return respondError(req, res, 400, requestError);

        if (!requestDeleted) return respondError(req, res, 404, 'No se pudo eliminar la solicitud');

        requestSucess(req, res, requestDeleted, 200, 'Solicitud eliminada con éxito');
        
    }catch (error){
        handleError(error, 'request.controller -> deleteRequest');
        return respondError(req, res, 500, 'Error al eliminar la solicitud');  
    } 
};

// UPDATE
async function updateRequest(req,res) {

    try {

        const {id} = req.params;
        const updateRequest = req.body;

        const [requestUpdated, requestError] = await requestService.updateRequest(id, updateRequest);

        if (requestError) return respondError(req, res, 400, requestError);
        if (!requestUpdated) return respondError(req, res, 404, 'No se pudo actualizar la solicitud');
        
        respondSucess(req, res, requestUpdated, 200, 'Solicitud actualizada con éxito');

    }catch(error){
        handleError(error, 'request.controller -> updateRequest');
        return respondError(req, res, 500, 'Error al actualizar la solicitud');
    }
}
// GET ALL
async function getRequests(req,res) {

    try {

        const [requests, requestError] = await requestService.getRequests();

        if (requestError) return respondError(req, res, 400, requestError);

        if (!requests) return respondError(req, res, 404, 'No se encontraron solicitudes');

        respondSucess(req, res, requests, 200, 'Solicitudes encontradas con éxito');       

    }catch(error){
        handleError(error, 'request.controller -> getRequests');
        return respondError(req, res, 500, 'Error al obtener las solicitudes');

    }
}
// GET BY ID
async function getRequestById(req,res) {

    try {
        const {params} = req;
        const {id} = params;
        const [requestFound, requestError] = await requestService.getRequestById(id);

        if (requestError) return respondError(req, res, 400, requestError);

        if (!requestFound) return respondError(req, res, 404, 'No se encontró la solicitud');

        respondSucess(req, res, requestFound, 200, 'Solicitud encontrada con éxito');

    }catch(error){
        handleError(error, 'request.controller -> getRequestById');
        return respondError(req, res, 500, 'Error al obtener la solicitud');
    }


}
// GET BY STATUS

module.exports = {
    createRequest,
    deleteRequest,
    updateRequest,
    getRequests,
    getRequestById,
};