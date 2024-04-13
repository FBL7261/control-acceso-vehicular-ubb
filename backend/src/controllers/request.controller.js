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
// GET
// GET ALL
// GET BY ID
// GET BY STATUS

module.exports = {
    createRequest,
    deleteRequest,
};