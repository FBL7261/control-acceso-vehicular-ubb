import { handleError } from '../utils/errorHandler.js';
import {respondSuccess, respondError} from '../utils/resHandler.js';
import regEntryBodySchema from '../schema/regEntry.schema.js';
import regEntryService from '../services/regEntry.service.js';

/**
 * 
 * @name createRegEntry
 * @description registra una nueva entrada para alguien que no se encuentra registrado en el sistema
 * 
 */

async function createRegEntry(req, res) {
   try{
        // se obtienen los datos del body
        const { body } = req;
        // se valida el body
        const { error: bodyError } = regEntryBodySchema.validate(body);
        // si hay un error en el body se responde con un error 400
        if (bodyError) {
            return respondError(req, res, 400, bodyError.message);
        }
        // servicio para crear el registro de entrada
        const [newRegEntry, regEntryError] = await regEntryService.createRegEntry(body);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!newRegEntry) {
            return respondError(req, res, 500, 'No se pudo registrar la entrada');
        }
        respondSuccess(req, res, 201, {message: 'Entrada registrada con exito', data: newRegEntry});
    } catch (error) {
        handleError(error, "regEntry.controller -> createRegEntry");
        respondError(req, res, 400, error.message);
    }
};

// registro de entrada que valida si el usuario ya se encuentra registrado en el sistema
async function createRegEntryUser(req, res) {
    try {
        const { userID, reason } = req.body;

        // servicio para crear el registro de entrada
        const [newRegEntry, error] = await regEntryService.createRegEntryUser({ userID, reason });
        if (error) {
            return respondError(req, res, 400, error);
        }

        if (!newRegEntry) {
            return respondError(req, res, 500, 'No se pudo registrar la entrada');
        }

        respondSuccess(req, res, 201, { message: 'Entrada registrada con éxito', data: newRegEntry });
    } catch (error) {
        handleError(error, "regEntry.controller -> createRegEntry");
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
        respondSuccess(req, res, 200, {
            message: 'Entradas encontradas con exito', 
            data: regEntry
        });
    } catch (error) {
        handleError(error, "regEntry.controller -> getRegEntry");
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
        // se obtiene la fecha de la entrada
        const { params } = req;
        const { date } = params;
        // se busca la entrada por la fecha
        const [regEntry, regEntryError] = await regEntryService.getEntryByDate(date);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 201, {
            message: 'Entrada encontrada con exito',
            //muestra las entradas encontradas
            data: regEntry
        });

    } catch (error) {
        handleError(error, "regEntry.controller -> getEntryByDate");
        respondError(req, res, 400, error.message);
    }
}

/**
 * @name getRegEntryByPlate
 * @description busca una entrada registrada por su placa
 */
async function getRegEntryByPlate(req, res) {
    try {
        const { plate } = req.params;
        const [regEntry, regEntryError] = await regEntryService.getRegEntryByPlate(plate);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 200, {data: regEntry});
    } catch (error) {
        handleError(error, "regEntry.controller -> getRegEntryByPlate");
        respondError(req, res, 400, error.message);
    }
}

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
        handleError(error, "regEntry.controller -> getRegEntryByRut");
        respondError(req, res, 400, error.message);
    }
}


/**
 * @name updateRegEntryByRut
 * @description actualiza una entrada registrada por su rut
 */
async function updateRegEntryByRut(req, res) {
    try {
        const { rut } = req.params;
        const { body } = req;
        const [regEntry, regEntryError] = await regEntryService.updateRegEntryByRut(rut, body);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError.message);
        }
        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 200, {data: regEntry});
    } catch (error) {
        handleError(error, "regEntry.controller -> updateRegEntryByRut");
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
        handleError(error, "regEntry.controller -> deleteRegEntryByRut");
        respondError(req, res, 400, error.message);
    }
}


// Exportar todas las funciones
export default {
    createRegEntryUser,
    createRegEntry,
    getRegEntry,
    getEntryByDate,
    getRegEntryByPlate,
    getRegEntryByRut,
    updateRegEntryByRut,
    deleteRegEntryByRut
}