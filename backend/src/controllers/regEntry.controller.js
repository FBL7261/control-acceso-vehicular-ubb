const regEntry = require('../models/regEntry.model');
const { handleErrors } = require('../utils/errorHandler');
const {respondSuccess, respondError} = require('../utils/responsesHandler');
const {regEntryBodySchema} = require('../schemas/regEntry.schema');
const regEntryService = require('../services/regEntry.service');

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

module.exports = {
    createRegEntry,
    getRegEntryByRut,
    getEntryByDate,
    getRegEntry
}