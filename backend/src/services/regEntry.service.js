const RegEntry = require('../models/regEntry.model');

const { handleErrors } = require('../utils/errorHandler');

/**
 * @name getRegEntry
 * @description busca todas las entradas registradas durante el dia
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
        handleErrors(error, "regEntry.service -> activateRegEntry");
    }
}
/**
 * 
 * @name getRegEntryByRutOrPlate
 * @description busca una entrada registrada por su rut o patente
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
        handleErrors(error, "regEntry.service -> activateRegEntry");
    }
}
// por rut o patente
// async function getRegEntryByRutOrPlate(req, res) {
//     try {
//         const { rut, plate } = req.params;
//         const regEntry = await RegEntry.findOne({ $or: [{ rut }, { plate }] });
//         if (!regEntry) {
//             return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
//         }
//         res.status(200).json(regEntry);
//     } catch (error) {
//         handleErrors(res, error);
//     }
// }
/**
 * 
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
        handleErrors(error, "regEntry.service -> activateRegEntry");
    }
}

/**
 * @name activateRegEntry
 * @description activa manualmente la entrada de un usuario a la universidad
 * @param {String} rut rut del usuario
 * @returns 
 */

// activa manualmente la entrada de un usuario por rut

async function activateRegEntryByRut(req, res){
    try {
        const regEntryFound = await RegEntry.findOne({ rut: req.params.rut });
        if (!regEntryFound) {
            return res.status(404).json({ message: 'No se ha encontrado registro en el sistema' });
        }
        const regEntryActivated = await RegEntry.findOneAndUpdate({ rut: req.params.rut }, { state: true, date: Date.now() });
        return [regEntryActivated, null];
    }
    catch (error) {
        handleErrors(error, "regEntry.service -> activateRegEntry");
    }
}

/**
 * @name deactivateRegEntry
 * @description desactiva manualmente la entrada de un usuario a la universidad
 * @param {String} rut rut del usuario
 * @returns 
 */
// desactiva automaticamente la entrada de todos los que ingresaron a las 00:00
async function deactivateRegEntry(req, res) {
    try {
        const regEntries = await RegEntry.find();
        if (regEntries.length === 0) {
            return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
        }
        const regEntriesDeactivated = await RegEntry.updateMany({ date: { $lt: new Date().setHours(0, 0, 0, 0) } }, { state: false });
        return [regEntriesDeactivated, null];
    } catch (error) {
        handleErrors(error, "regEntry.service -> activateRegEntry");
    }
}

export default { 
    getRegEntry, 
    getRegEntryByRut, 
    createRegEntry, 
    activateRegEntryByRut, 
    deactivateRegEntry 
};
 