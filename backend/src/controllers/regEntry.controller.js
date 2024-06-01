const regEntry = require('../models/regEntry.model');
const { handleErrors } = require('../utils/errorHandler');
const {respondSuccess, respondError} = require('../utils/responsesHandler');
const {regEntryBodySchema} = require('../schemas/regEntry.schema');
const regEntryService = require('../services/regEntry.service');


// registro de entrada que valida si el usuario ya se encuentra registrado en el sistema, si es asi, se actualiza la fecha de entrada y se guarda en la base de datos

async function createRegEntryUser(req, res) {
    try {
        // se obtienen los datos del body
        const { body } = req;
        // se valida el body
        const { error:bodyError } = regEntryBodySchema.validate(body);
        // si hay un error en el body se responde con un error 400
        if (bodyError) {
            return respondError(req, res, 400, bodyError.message);
        }
        // se crea el nuevo registro
        const [newRegEntry, regEntryError] = await regEntryService.createRegEntryUser(body);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!newRegEntry) {
            return respondError(req, res, 500, 'No se pudo registrar la entrada');
        }
        respondSuccess(req, res, 201, {message: 'Entrada registrada con exito', data: newRegEntry});
    } catch (error) {
        handleErrors(error, "regEntry.controller -> createRegEntryUser");
        respondError(req, res, 400, error.message);
    }
}


/**
 * 
 * @name createRegEntry
 * @description registra una nueva entrada para alguien que no se encuentra registrado en el sistema
 * 
 */

async function createRegEntry(req, res) {
   try{
        const { body } = req;
        const { error:bodyError } = regEntryBodySchema.validate(body);
        if (bodyError) {
            return respondError(req, res, 400, bodyError.message);
        }
        const [newRegEntry, regEntryError] = await regEntryService.createRegEntry(body);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!newRegEntry) {
            return respondError(req, res, 500, 'No se pudo registrar la entrada');
        }
        respondSuccess(req, res, 201, {message: 'Entrada registrada con exito', data: newRegEntry});
    } catch (error) {
        handleErrors(error, "regEntry.controller -> createRegEntry");
        respondError(req, res, 400, error.message);
    }
};
/**
 * 
 * @name getRegEntryByRut
 * @description busca una entrada registrada por su rut
 */

async function getRegEntryByRut(req, res) {
    try {
        const { rut } = req.params;
        const [regEntry, regEntryError] = await regEntryService.getRegEntryByRut(rut);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 200, {data: regEntry});
    } catch (error) {
        handleErrors(error, "regEntry.controller -> getRegEntryByRut");
        respondError(req, res, 400, error.message);
    }
}
/**
 * 
 * @name getEntryByDate
 * @description busca una entrada registrada por su fecha
 
 */
async function getEntryByDate (req, res) {
    try {
        const { date } = req.params;
        const [regEntry, regEntryError] = await regEntryService.getEntryByDate(date);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 200, {data: regEntry});
    } catch (error) {
        handleErrors(error, "regEntry.controller -> getEntryByDate");
        respondError(req, res, 400, error.message);
    }
}

/**
 * 
 * @name getRegEntry
 * @description busca todas las entradas registradas
 
 */
async function getRegEntry(req, res) {
    try {
        const [regEntry, regEntryError] = await regEntryService.getRegEntry();
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (regEntry.length === 0) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 200, {data: regEntry});
    } catch (error) {
        handleErrors(error, "regEntry.controller -> getRegEntry");
        respondError(req, res, 400, error.message);
    }
}

/**
 * @name deleteRegEntryByRut
 * @description elimina una entrada registrada por su rut
 
 */
async function deleteRegEntryByRut(req, res) {
    try {
        const { rut } = req.params;
        const [regEntry, regEntryError] = await regEntryService.deleteRegEntryByRut(rut);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 200, {message: 'Entrada eliminada con exito'});
    } catch (error) {
        handleErrors(error, "regEntry.controller -> deleteRegEntryByRut");
        respondError(req, res, 400, error.message);
    }
}


// Exportar todas las funciones
module.exports = {
    createRegEntryUser,
    createRegEntry,
    getRegEntryByRut,
    getEntryByDate,
    getRegEntry,
    deleteRegEntryByRut
}