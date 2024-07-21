import User from '../models/user.model.js';
import Request from '../models/request.model.js';
import PDFModel from "../models/pdf.model.js";
import mongoose from 'mongoose';
import { handleError } from '../utils/errorHandler.js';

// CREATE
async function createRequest(email, requestData, file) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return [null, "Usuario no encontrado"];
        }
        if (user.username !== requestData.username) {
            return [null, "El usuario no coincide con la persona autenticada"];
        }
        if (user.rut !== requestData.rut) {
            return [null, "El rut no coincide con la persona autenticada"];
        }
        if (user.email !== requestData.email) {
            return [null, "El email no coincide con la persona autenticada"];
        }
        const requestExistente = await Request.findOne({
            email: requestData.email,
        });
        if (requestExistente) {
            return [null, "Ya existe una solicitud para esta persona"];
        }

        const newRequest = new Request({
            username: requestData.username,
            rut: requestData.rut,
            email: requestData.email,
            description: requestData.description,
            status: requestData.status || 'Pendiente', // Proporcionar un valor por defecto si no se proporciona
        });

        await newRequest.save();

        if (file) {
            const newPDF = new PDFModel({
                name: file.originalname,
                filePath: file.path,
                user: user._id,
                nombre: user.username,
            });

            await newPDF.save();
        }

        return [newRequest, null];  // Asegúrate de devolver el objeto de la solicitud creada

    } catch (error) {
        handleError(error, "request.service -> createRequest");
        return [null, "Error al crear la solicitud en servicio"];
    }
}

// DELETE
async function deleteRequest(requestId) {
    try {
        const deletedRequest = await Request.findByIdAndDelete(requestId);

        return [deletedRequest, null];
    } catch (error) {
        handleError(error, "request.service -> deleteRequest");
        return [null, "Error al eliminar la solicitud en el servicio"];
    }
}

// UPDATE
async function updateRequest(id, requestUpdate) {
    try {
        const request = await Request.findById(id);

        if (!request) {
            return [null, "Solicitud no encontrada"];
        }

        Object.assign(request, requestUpdate);

        const modifiedRequest = await request.save();
        
        return [modifiedRequest, null];
    } catch (error) {
        handleError(error, "request.service -> updateRequest");
        return [null, "Error al actualizar la solicitud en el servicio"];
    }
}

// GET ALL
async function getRequests() {
    try {
        const requests = await Request.find().exec();
        return [requests, null];
    } catch (error) {
        handleError(error, "request.service -> getRequests");
        return [null, "Error al obtener las solicitudes en el servicio"];
    }
}

// GET REQUEST BY ID
async function getRequestById(requestId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return [null, "Invalid Request ID"];
        }
        const request = await Request.findById(requestId);
        if (!request) {
            return [null, "Solicitud no encontrada"];
        }
        return [request, null];
    } catch (error) {
        handleError(error, "request.service -> getRequestById");
        return [null, "Error al obtener la solicitud en el servicio"];
    }
}

// Update Status Request
async function updateRequestStatus(requestId, newStatus) {
    try {
        const request = await Request.findByIdAndUpdate(requestId, { status: newStatus }, { new: true });

        if (!request) {
            throw new Error("Solicitud no encontrada");
        }

        return request;
    } catch (error) {
        throw new Error("Error al actualizar el estado de la solicitud");
    }
}

// GET REQUESTS BY USER EMAIL
async function getRequestsByUserEmail(email) {
    try {
        const requests = await Request.find({ email: email });
        if (!requests) {
            return [null, "No se encontraron solicitudes para este usuario"];
        }
        return [requests, null];
    } catch (error) {
        handleError(error, "request.service -> getRequestsByUserEmail");
        return [null, "Error al obtener las solicitudes del usuario en el servicio"];
    }
}


export default {
    createRequest,
    deleteRequest,
    getRequests,
    getRequestById,
    updateRequest,
    updateRequestStatus,
    getRequestsByUserEmail,
};
