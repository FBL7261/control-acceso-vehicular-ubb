import { handleError } from '../utils/errorHandler.js';
import {respondSuccess, respondError} from '../utils/resHandler.js';
import regEntryBodySchema from '../schema/regEntry.schema.js';
import regEntryService from '../services/regEntry.service.js';
import mongoose from 'mongoose';

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
async function getEntryByDate(req, res) {
    try {
        // se obtiene la fecha de la URL
        const { date } = req.params;

        // servicio para obtener las entradas por fecha
        const [regEntry, regEntryError] = await regEntryService.getEntryByDate(date);
        // si hay un error en la busqueda se responde con un error 400
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError);
        }
        // si no se encuentra la fecha, se responde con un error 404
        if (!regEntry || regEntry.length === 0) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        
        respondSuccess(req, res, 200, { data: regEntry });
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
            return respondError(req, res, 400, regEntryError);
        }
        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 200, { data: regEntry });
    } catch (error) {
        handleError(error, "regEntry.controller -> getRegEntryByPlate");
        respondError(req, res, 400, error.message);
    }
}

/**
 * 
 * @name getRegEntryById
 * @description busca una entrada registrada por su Id
 */

async function getRegEntryById(req, res) {
    try {
        const { id } = req.params;

        // Validar formato del ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return respondError(req, res, 400, 'ID inválido');
        }

        const [regEntry, regEntryError] = await regEntryService.getRegEntryById(id);

        if (regEntryError) {
            return respondError(req, res, 400, regEntryError);
        }

        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }

        return respondSuccess(req, res, 200, {
            message: 'Entrada encontrada con éxito',
            data: regEntry
        });
    } catch (error) {
        handleError(error, "regEntry.controller -> getRegEntryById");
        return respondError(req, res, 500, error.message);
    }
}


/**
 * @name deleteRegEntryById
 * @description elimina una entrada registrada por su Id
 
 */
async function deleteRegEntryById(req, res) {
    try {
        const { id } = req.params;
        const [regEntry, regEntryError] = await regEntryService.deleteRegEntryById(id);
        if (regEntryError) {
            return respondError(req, res, 400, regEntryError);
        }
        if (!regEntry) {
            return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
        }
        respondSuccess(req, res, 200, { message: 'Entrada eliminada con éxito' });
    } catch (error) {
        handleError(error, "regEntry.controller -> deleteRegEntryById");
        respondError(req, res, 400, error.message);
    }
}

// /**
//  * @name updateRegEntryById
//  * @description actualiza una entrada registrada por su rut
//  */
// async function updateRegEntryById(req, res) {
//     try {
//         const { rut } = req.params;
//         const { body } = req;
//         const [regEntry, regEntryError] = await regEntryService.updateRegEntryById(rut, body);
//         if (regEntryError) {
//             return respondError(req, res, 400, regEntryError.message);
//         }
//         if (!regEntry) {
//             return respondError(req, res, 404, 'No se ha encontrado registro de entrada');
//         }
//         respondSuccess(req, res, 200, {data: regEntry});
//     } catch (error) {
//         handleError(error, "regEntry.controller -> updateRegEntryById");
//         respondError(req, res, 400, error.message);
//     }
//}





// Exportar todas las funciones
export default {
    createRegEntryUser,
    createRegEntry,
    getRegEntry,
    getEntryByDate,
    getRegEntryByPlate,
    getRegEntryById,
    deleteRegEntryById,
    //updateRegEntryById
}