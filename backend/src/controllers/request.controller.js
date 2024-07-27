// request.controller.js
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import requestService from '../services/request.service.js';
import { requestBodySchema } from '../schema/request.schema.js';
import User from '../models/user.model.js';
import Request from '../models/request.model.js'
import PDF from '../models/pdf.model.js'
import fs from 'fs';
import path from 'path';

// CREATE
export async function createRequest(req, res) {
  try {
    const email = req.email;  // Obteniendo el email del usuario autenticado
    const requestData = req.body;
    const { file } = req;

    const { error: bodyError } = requestBodySchema.validate(requestData);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    const [newRequest, requestError] = await requestService.createRequest(email, requestData, file);

    if (requestError) return respondError(req, res, 400, requestError);

    if (!newRequest) return respondError(req, res, 400, 'No se pudo crear la solicitud');

    respondSuccess(req, res, 200, newRequest);

  } catch (error) {
    handleError(error, 'request.controller -> createRequest');
    return respondError(req, res, 500, 'Error al crear la solicitud en el controlador');
  }
}

// DELETE
export async function deleteRequest(req, res) {
  try {
    const requestId = req.params.id;
    const deletedRequest = await requestService.deleteRequest(requestId);
    if (!deletedRequest) {
      return respondError(req, res, 404, 'Solicitud no encontrada');
    }
    respondSuccess(req, res, 200, 'Solicitud eliminada con éxito');
  } catch (error) {
    handleError(error, 'request.controller -> deleteRequest');
    respondError(req, res, 500, 'No se pudo eliminar la solicitud');
  }
}

// UPDATE
export async function updateRequest(req, res) {
  try {
    const requestId = req.params.id;
    const updateData = req.body;
    const request = await Request.findById(requestId).populate('pdfs');
    if (!request) {
      return res.status(404).send({ message: 'Solicitud no encontrada' });
    }

    // Eliminar PDF existente si hay un nuevo PDF
    if (req.file) {
      if (request.pdf) {
        await deletePDF(request.pdf);
      }
      const pdf = new PDF({
        name: req.file.originalname,
        filePath: req.file.path,
        user: req.user._id,
      });
      await pdf.save();
      updateData.pdf = pdf._id; // Actualiza el campo PDF en la solicitud
    }

    const updatedRequest = await Request.findByIdAndUpdate(requestId, updateData, { new: true }).populate('pdfs');

    if (!updatedRequest) {
      return res.status(404).send({ message: 'Solicitud no encontrada' });
    }

    res.send(updatedRequest);
  } catch (error) {
    console.error('Error al actualizar solicitud:', error);
    res.status(500).send({ message: 'Error al actualizar solicitud' });
  }
}

// GET ALL
export async function getRequests(req, res) {
    try {
        const [requests, error] = await requestService.getRequests();
        if (error) {
            return respondError(req, res, 400, error);
        }
        const requestsWithPDFs = await Promise.all(
            requests.map(async (request) => {
                const user = await User.findOne({ email: request.email });
                if (!user) {
                    throw new Error("Usuario no encontrado para la solicitud");
                }
                const pdfs = await requestService.getPDFsForUser(user._id);  
                return { ...request.toObject(), pdfs };
            })
        );
        return respondSuccess(req, res, 200, requestsWithPDFs);
    } catch (error) {
        handleError(error, "request.controller -> getRequests");
        return respondError(req, res, 500, 'Error al obtener las solicitudes');
    }
}

export async function getRequestsByUserEmail(req, res) {
  try {
      const email = req.email; 
      const userId = req.userId;

      const [requests, error] = await requestService.getRequestsByUserEmail(email);

      if (error) {
          return respondError(req, res, 400, error);
      }

      const requestsWithPDFs = await Promise.all(requests.map(async (request) => {
          const [pdfs, pdfError] = await requestService.getPDFsByRequestId(request._id);
          if (pdfError) {
              return { ...request.toObject(), pdfs: [] };
          }
          return { ...request.toObject(), pdfs };
      }));

      return respondSuccess(req, res, 200, { data: requestsWithPDFs });
  } catch (error) {
      handleError(error, "request.controller -> getRequestsByUserEmail");
      return respondError(req, res, 500, 'Error al obtener las solicitudes');
  }
}

  export async function updateRequestStatus(req, res) {
    const requestId = req.params.id;
    const newStatus = req.body.status;

    if (!requestId || !newStatus) {
        return respondError(req, res, 400, 'Faltan parámetros: ID o estado');
    }

    try {
        const request = await requestService.updateRequestStatus(requestId, newStatus);

        if (!request) {
            return respondError(req, res, 404, "Solicitud no encontrada");
        }

        return respondSuccess(req, res, 200, 'Solicitud actualizada con éxito', request);
    } catch (error) {
        handleError(error, "request.controller -> updateRequestStatus");
        return respondError(req, res, 500, `Error al actualizar el estado de la solicitud: ${error.message}`);
    }
}

export async function getRequestById(req, res) {
  try {
    console.log('Recibiendo solicitud para ID:', req.params.id);
    const request = await Request.findById(req.params.id).populate('pdfs');
    if (!request) {
      return res.status(404).send({ message: 'Solicitud no encontrada' });
    }
    console.log('Solicitud encontrada:', request);
    res.send(request);
  } catch (error) {
    console.error('Error al obtener solicitud por ID:', error);
    res.status(500).send({ message: 'Error al obtener solicitud Controlador', error });
  }
}

export async function getPDFsByRequestId(req, res) {
  const { requestId } = req.params;

  try {
      const [pdfs, error] = await requestService.getPDFsByRequestId(requestId);

      if (error) {
          return respondError(req, res, 400, error);
      }

      return respondSuccess(req, res, 200, pdfs);
  } catch (error) {
      handleError(error, "request.controller -> getPDFsByRequestId");
      return respondError(req, res, 500, 'Error al obtener los PDFs para la solicitud');
  }
}

async function deletePDF(pdfId) {
  const pdf = await PDF.findById(pdfId);
  if (pdf) {
    // Eliminar el archivo físicamente
    fs.unlinkSync(path.resolve(pdf.filePath));
    // Eliminar la entrada en la base de datos
    await PDF.findByIdAndDelete(pdfId);
  }
}
