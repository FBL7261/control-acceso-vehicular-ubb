import User from '../models/user.model.js';
import Request from '../models/request.model.js';
import PDFModel from "../models/pdf.model.js";
import { handleError } from '../utils/errorHandler.js';

// CREATE
async function createRequest(email, requestData, file) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return [null, "Usuario no encontrado"];
        }
        if (user.username !== requestData.user.username) {
            return [null, "El usuario no coincide con la persona autenticada"];
        }
        if (user.rut !== requestData.user.rut) {
            return [null, "El rut no coincide con la persona autenticada"];
        }
        if (user.email !== requestData.user.email) {
            return [null, "El email no coincide con la persona autenticada"];
        }
        const requestExistente = await Request.findOne({
            "user.email": requestData.user.email,
        });
        if (requestExistente) {
            return [null, "Ya existe una solicitud para esta persona"];
        }
        const newRequest = new Request({
            user: {
                username: requestData.user.username,
                rut: requestData.user.rut,
                email: requestData.user.email
            },
            status: requestData.status,
            description: requestData.description,
            createdAt: new Date().toISOString()
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
async function deleteRequest(request) {
    try {
        const deletedRequest = await Request.findByIdAndDelete(request);

        return [deletedRequest, null];
    } catch (error) {
        handleError(error, "request.service -> deleteRequest");
        return [null, "Error al eliminar la solicitud service"];
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

        const modifyRequest = await request.save();
        
        return [modifyRequest, null];
    } catch (error) {
        handleError(error, "request.service -> updateRequest");
        return [null, "Error al actualizar la solicitud service"];
    }
}

// GET ALL
async function getRequests() {
    try {
        const requests = await Request.find().populate('user');
        return [requests, null];
    } catch (error) {
        handleError(error, "request.service -> getRequests");
        return [null, "Error al obtener las solicitudes servicio"];
    }
}

// GET REQUESTS BY USER ID
async function getRequestsByUserId(userId) {
    try {
        const requests = await Request.find({ 'user': userId }).populate('user');
        return [requests, null];
    } catch (error) {
        handleError(error, "request.service -> getRequestsByUserId");
        return [null, "Error al obtener las solicitudes del usuario"];
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

export default {
    createRequest,
    deleteRequest,
    getRequests,
    getRequestsByUserId,
    updateRequest,
    updateRequestStatus,
};
