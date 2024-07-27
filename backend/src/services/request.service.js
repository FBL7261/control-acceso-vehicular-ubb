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
        // Verificar si el usuario tiene una solicitud previa
        const previousRequest = await Request.findOne({
            email: requestData.email,
            status: { $ne: 'Rechazada' },
        });
        if (previousRequest) {
            return [null, "Ya existe una solicitud pendiente o aprobada para esta persona"];
        }

        const newRequest = new Request({
            username: requestData.username,
            rut: requestData.rut,
            email: requestData.email,
            description: requestData.description,
            status: requestData.status || 'Pendiente',
        });

        await newRequest.save();

        if (file) {
            const newPDF = new PDFModel({
                name: file.originalname,
                filePath: file.path,
                user: user._id,
                nombre: user.username,
                request: newRequest._id,
            });

            await newPDF.save();
        }

        return [newRequest, null];

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

async function getRequests() {
    try {
        const requests = await Request.find().exec();
        return [requests, null];
    } catch (error) {
        handleError(error, "request.service -> getRequests");
        return [null, "Error al obtener las solicitudes en el servicio"];
    }
}

// GET PDFs FOR USER
async function getPDFsForUser(userId) {
    try {
        const pdfs = await PDFModel.find({ user: userId }).exec();
        return pdfs;
    } catch (error) {
        handleError(error, "request.service -> getPDFsForUser");
        return [];
    }
}

// GET REQUESTS BY USER EMAIL
async function getRequestsByUserEmail(email) {
    try {
      const requests = await Request.find({ email: email });
      if (!requests || requests.length === 0) {
        return [[], "No hay solicitudes para este usuario"];
      }
  
      return [requests, null];
    } catch (error) {
      handleError(error, "request.service -> getRequestsByUserEmail");
      console.error("Error al obtener las solicitudes en el servicio", error);
      return [[], "Error al obtener las solicitudes en el servicio"];
    }
  }
  
  // GET PDFs BY USER ID
  async function getPDFsByUserId(userId) {
    try {
      const pdfs = await PDFModel.find({ user: userId });
      if (!pdfs || pdfs.length === 0) {
        return [[], "No hay PDFs para este usuario"];
      }
  
      return [pdfs, null];
    } catch (error) {
      handleError(error, "request.service -> getPDFsByUserId");
      console.error("Error al obtener los PDFs en el servicio", error);
      return [[], "Error al obtener los PDFs en el servicio"];
    }
  }

  async function updateRequestStatus(requestId, newStatus) {

    try {
        const request = await Request.findByIdAndUpdate(requestId, { status: newStatus }, { new: true });

        if (!request) {
            throw new Error("Solicitud no encontrada");
        }

        return request;
    } catch (error) {
        console.error(`Error al actualizar el estado de la solicitud: ${error.message}`);
        throw new Error("Error al actualizar el estado de la solicitud");
    }
}

async function getPDFsByRequestId(requestId) {
    try {
        const pdfs = await PDFModel.find({ request: requestId });
        if (!pdfs || pdfs.length === 0) {
            return [[], "No hay PDFs para esta solicitud"];
        }
        return [pdfs, null];
    } catch (error) {
        handleError(error, "request.service -> getPDFsByRequestId");
        console.error("Error al obtener los PDFs en el servicio", error);
        return [[], "Error al obtener los PDFs en el servicio"];
    }
}

export default {
    createRequest,
    deleteRequest,
    getRequests,
    getRequestsByUserEmail,
    updateRequestStatus,
    getPDFsForUser,
    getPDFsByUserId,
    updateRequest,
    getPDFsByRequestId,
};
