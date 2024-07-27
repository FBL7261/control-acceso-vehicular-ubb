import RegEntry from '../models/regEntry.model.js';
import User from '../models/user.model.js';
import Vehicle from '../models/vehicle.model.js';
import { handleError } from '../utils/errorHandler.js'

/**
 * @name createRegEntry
 * @description registra una nueva entrada para alguien que no se encuentra registrado en el sistema
 * @param {object} regEntry - objeto con los datos de la entrada
 * @returns {Promise} Promesa con el mensaje de la entrada registrada correctamente
 */
// registra una nueva entrada
async function createRegEntry(regEntry) {
    try {
        const { rut, plate, name, date, reason } = regEntry;
        const newRegEntry = new RegEntry({ 
            rut, 
            plate, 
            name, 
            date, 
            reason });
        await newRegEntry.save();
        return [newRegEntry, null];
    } catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
        return [null, "Error al registrar la entrada"]
    }
}

/**
 * @name createRegEntryUser
 * @description registra a usuario que ya se encuentra registrado en el sistema
 * 
 */

// registra una nueva entrada para un usuario que ya se encuentra registrado en el sistema
async function createRegEntryUser({ rut, plate }) {
    try {
        // Buscar el usuario por su id de propietario
        const user = await User.findOne({rut});
        // Si no se encuentra el usuario, se responde con un error
        if (!user) {
            return [null, 'No se ha encontrado registro de usuario en el sistema'];
        }
        // busca el vehículo del usuario
        const vehicle = await Vehicle.findOne({propietario: user._id, matricula: plate});
        // Si no se encuentra el vehículo, se responde con un error
        if (!vehicle) {
            return [null, 'No se ha encontrado registro de vohiculo en el sistema'];
        }
        // Crear una nueva entrada
        const newRegEntry = new RegEntry({
            rut: user.rut,
            plate: vehicle.matricula,
            name: user.username,
            date: new Date(), // La fecha actual
            //reason,
        });
        await newRegEntry.save();
        return [newRegEntry, null];
    } catch (error) {
        handleError(error, "regEntry.service -> createRegEntryUser");
        return [null, 'Error al registrar la entrada'];
    }
}


/**
 * @name getRegEntry
 * @description busca todas las entradas registradas
 * @return {Promise} Promesa con el objeto de las entradas registradas en la base de datos      
*/
// busca todas las entradas registradas durante el dia
async function getRegEntry() {
    try {
        const regEntrys = await RegEntry.find();
        if (!regEntrys) {
            return [null, 'No se han encontrado registros'];
        }
        return [regEntrys, null];

    } catch (error) {
        handleError(error, "regEntry.service -> activateRegEntry");
        return [null, "Error al registrar la entrada"]
    }
}


/**
 * @name getRegEntryByDate
 * @description busca una entrada registrada por su fecha
 * 
 */
async function getEntryByDate(date) {
    try {
        // Convertir la fecha a un rango de tiempo para buscar entradas en ese día
        const searchDate = new Date(date);
        const startOfDay = new Date(searchDate.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(searchDate.setUTCHours(23, 59, 59, 999));

        // Buscar todas las entradas registradas por fecha 
        const regEntries = await RegEntry.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        // si no se encuentra la fecha, se responde con un error
        if (regEntries.length === 0) {
            return [null, 'No se han encontrado registros'];
        }

        return [regEntries, null];
    } catch (error) {
        handleError(error, "regEntry.service -> getEntryByDate");
        return [null, 'Error al buscar registros de entrada'];
    }
}


/**
 * @name getRegEntryByPlate
 * @description busca una entrada registrada por su platente
 */

// busca una entrada registrada solo por su placa.
async function getRegEntryByPlate(plate) {
    try {
        const regEntry = await RegEntry.findOne({ plate });
        if (!regEntry) {
            return [null, 'No se ha encontrado registro de entrada'];
        }
        return [regEntry, null];
    } catch (error) {
        handleError(error, "regEntry.service -> getRegEntryByPlate");
        return [null, 'Error al buscar registro de entrada'];
    }
}

async function getRegEntryByRut(rut) {
    try {
        const entries = await RegEntry.find({ rut });

        if (!entries || entries.length === 0) {
            return [null, "No se ha encontrado registro de entrada"];
        }
        return [entries, null];
    } catch (error) {
        handleError(error, "regEntry.controller -> getRegEntryByRut");
        respondError(req, res, 400, error.message);
    }
}

/**
 * 
 * @name getRegEntryById
 * @description busca una entrada registrada por su Id
 * @param {String} Id Id del usuario
 * @returns {Promise} Promesa con el objeto de la entrada registrada en la base de datos
 */
// busca una entrada registrada solo por su Id.

async function getRegEntryById(id) {
    try {
        const regEntry = await RegEntry.findById(id).exec();
        if (!regEntry) {
            return [null, 'No se ha encontrado registro de entrada'];
        }
        return [regEntry, null];
    } catch (error) {
        handleError(error, "regEntry.service -> getRegEntryById");
        return [null, 'Error al buscar registro de entrada por ID'];
    }
}




/**
 * @name deleteRegEntryById
 * @description elimina una entrada a la universidad registrada por su rut
 * 
 */
async function deleteRegEntryById(id) {
    try {
        const regEntry = await RegEntry.findByIdAndDelete(id);
        if (!regEntry) {
            return [null, 'No se ha encontrado registro de entrada'];
        }
        return [regEntry, null];
    } catch (error) {
        handleError(error, "regEntry.service -> deleteRegEntryById");
        return [null, 'Error al eliminar el registro de entrada'];
    }
}


// /**
//  * @name updateRegEntryById
//  * @description actualiza una entrada registrada por su Id
//  */
// // actualiza una entrada registrada por Id.
// async function updateRegEntryById(Id) {
//     try {
//         const { id } = req.params;
//         const regEntry = await RegEntry.findOneAndUpdate({ id }, req
//             .body, { new: true });
//         if (!regEntry) {
//             return res.status(404).json({ message: 'No se ha encontrado registro de entrada' });
//         }
//         res.status(200).json(regEntry);
//     }
//     catch (error) {
//         handleError(error, "regEntry.service -> activateRegEntry");
//     }
// }

export default { 
    createRegEntry, 
    createRegEntryUser,
    getRegEntry,
    getEntryByDate, 
    getRegEntryByPlate,
    getRegEntryById,
    getRegEntryByRut, 
    deleteRegEntryById
    //updateRegEntryById
};