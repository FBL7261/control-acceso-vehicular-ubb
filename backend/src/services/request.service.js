import user from '../models/user.model.js';
import request from  '../models/request.model.js';
import Document from '../models/document.model.js';
import {handleError}  from '../utils/errorHandler.js';

// CREATE
async function createRequest(email, requestData) {
    try {
        const User = await user.findOne( { email } );

        if (!User) {
            return [null, "Usuario no encontrado"];
        }

        if (User.username !== requestData.User.username) {
            return [null, "El usuario no coincide"];
        }

        if (User.rut !== requestData.User.rut) {
            return [null, "El rut no coincide"];
        }

        if (User.email !== requestData.User.email) {
            return [null, "El email no coincide"];
        }

        const requestFound = await request.findOne({"user.email": requestData.user.email});
        if (requestFound) {
            return [null, "Ya existe una solicitud"];
        }
        
        const documentFound = await Document.findOne({name: requestData.Document.name});
        if (!documentFound) {
            return [null, "Documento no encontrado"];
        }

        const newRequest = new request({
            user: {
                username: requestData.User.username,
                rut : requestData.User.rut,
                email: requestData.User.email,
            },
            Document: documentFound,
            status: requestData.status,
        });

        await newRequest.save();
        return [newRequest, null];

    }catch(error){
        handleError(error, "request.service -> createRequest");
    }

}

// DELETE
async function deleteRequest(id) {
    try {
        const deletedRequest = await request.findByIdAndDelete(id);

        if (!deletedRequest) {
            return [null, "Solicitud no encontrada o ya fue eliminada"];
        }

        return [deletedRequest, null];
    } catch (error) {
        handleError(error, "request.service -> deleteRequest");
        return [null, "Error al eliminar la solicitud debido a un problema interno"];
    }
}

// UPDATE
async function updateRequest(id, requestUpdateData) {
    try {
        const existingRequest = await request.findById(id);

        if (!existingRequest) {
            return [null, "Solicitud no encontrada"];
        }

        Object.assign(existingRequest, requestUpdateData);
        const updatedRequest = await existingRequest.save();
        
        return [updatedRequest, null];
    } catch (error) {
        handleError(error, "request.service -> updateRequest");
        return [null, "Error al actualizar la solicitud"];
    }
}

// GET ALL
async function getRequests() {
    try {    

        const requests = await request.find().populate('user', '-password, -roles, -_id');
        return [requests, null];

    }catch(error){
        handleError(error, "request.service -> getRequests");
    }

}

// GET BY ID
async function getRequestById(request) {
    try {
        const requestFound = await request.findById(request).populate('user', '-password, -roles, -_id');
        return [requestFound, null];
    }catch(error){
        handleError(error, "request.service -> getRequestById");
    }
}

export default {
    createRequest,
    deleteRequest,
    getRequests,
    getRequestById,
    updateRequest,
};