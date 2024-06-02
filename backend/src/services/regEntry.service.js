import RegEntry from '../models/regEntry.model.js';

import { handleError } from '../utils/errorHandler.js';


/**
 * @name createRegEntry
 * @description registra una nueva entrada para alguien que no se encuentra registrado en el sistema
 * @param {object} regEntry - objeto con los datos de la entrada
 * @returns {Promise} Promesa con el mensaje de la entrada registrada correctamente
 */
// registra una nueva entrada
async function createRegEntry(req, res) {
    try {
        const { rut, plate, name, date, reason } = req.body;
        const newRegEntry = new RegEntry({ rut, plate, name, date, reason });
        await newRegEntry.save();
        res.status(201).json({ message: 'Entrada registrada correctamente' });
    } catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
    }
}

/**
 * @name createRegEntryUser
 * @description registra validando si el usuario ya se encuentra registrado en el sistema
 * 
 */

// registra una nueva entrada
async function createRegEntryUser(req, res) {
    try {
        // se obtienen los datos del body
        const { rut, plate, name, date, reason } = req.body;
        // se busca si el usuario ya se encuentra registrado
        const regEntryFound = await RegEntry.findOne({ rut });
        if (regEntryFound) {
            return res.status(400).json({ message: 'El usuario ya se encuentra registrado' });
        }
        // se crea el nuevo registro
        const newRegEntry = new RegEntry({ rut, plate, name, date, reason });
        await newRegEntry.save();
        res.status(201).json({ message: 'Entrada registrada correctamente' });
    } catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
    }
}


/**
 * @name getRegEntry
 * @description busca todas las entradas registradas
 * @return {Promise} Promesa con el objeto de las entradas registradas en la base de datos      
*/
// busca todas las entradas registradas durante el dia
async function getRegEntry(req, res) {
    try {
        const regEntries = await RegEntry.find();
        if (regEntries.length === 0) {
            return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
        }
        res.status(200).json(regEntries);

    } catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
    }
}


/**
 * @name getRegEntryByDate
 * @description busca una entrada registrada por su fecha
 * 
 */
async function getEntryByDate(req, res) {
    try {
        const { date } = req.params;
        const regEntries = await RegEntry.find({ date });
        if (regEntries.length === 0) {
            return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
        }
        res.status(200).json(regEntries);
    } catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
    }
}


/**
 * @name getRegEntryByPlate
 * @description busca una entrada registrada por su platente
 */

// busca una entrada registrada solo por su placa.
async function getRegEntryByPlate(req, res) {
    try {
        const { plate } = req.params;
        const regEntry = await RegEntry.findOne({ plate });
        if (!regEntry) {
            return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
        }
        res.status(200).json(regEntry);
    }
    catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
    }
}

/**
 * 
 * @name getRegEntryByRut
 * @description busca una entrada registrada por su rut
 * @param {String} rut rut del usuario
 * @returns {Promise} Promesa con el objeto de la entrada registrada en la base de datos
 */
// busca una entrada registrada solo por su rut.
async function getRegEntryByRut(req, res) { 
    try {
        const { rut } = req.params;
        const regEntry = await RegEntry.findOne({ rut });
        if (!regEntry) {
            return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
        }
        res.status(200).json(regEntry);
    } catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
    }
}


/**
 * @name updateRegEntryByRut
 * @description actualiza una entrada registrada por su rut
 */
// actualiza una entrada registrada por rut.
async function updateRegEntryByRut(req, res) {
    try {
        const { rut } = req.params;
        const regEntry = await RegEntry.findOneAndUpdate({ rut }, req
            .body, { new: true });
        if (!regEntry) {
            return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
        }
        res.status(200).json(regEntry);
    }
    catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
    }
}

/**
 * @name deleteRegEntryByRut
 * @description elimina una entrada a la universidad registrada por su rut
 * 
 */
async function deleteRegEntryByRut(req, res) {
    try {
        const { rut } = req.params;
        const regEntry = await RegEntry.findOneAndDelete({ rut });
        if (!regEntry) {
            return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
        }
        res.status(200).json({ message: 'Entrada eliminada correctamente' });
    }
    catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
    }
}

export default { 
    createRegEntry, 
    createRegEntryUser,
    getRegEntry,
    getEntryByDate, 
    getRegEntryByPlate,
    getRegEntryByRut, 
    updateRegEntryByRut,
    deleteRegEntryByRut,
};