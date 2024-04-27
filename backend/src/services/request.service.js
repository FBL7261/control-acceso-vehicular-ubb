import User from '../models/user.model.js';
import Request from  '../models/request.model.js';
import {handleError}  from '../utils/errorHandler.js';
import { populate } from 'dotenv';

// CREATE
async function createRequest(email, requestData) {
    try {
        const user = await User.findOne({email});
        if (!user) {
            return [null, "Usuario no encontrado"];
        }
        if (user.username !== requestData.user.username){
            return [null, "El usuario no coincide con la persona autenticada"];
        }
        if (user.rut !== requestData.user.rut){
            return [null, "El rut no coincide con la persona autenticada"];
        }
        if (user.email !== requestData.user.email){
            return [null, "El email no coincide con la persona autenticada"];
        }
        const requestExistente = await Request.findOne({
            "user.email": requestData.user.email,
          });
          if (requestExistente) {
            return [null, "Ya existe una solicitud para esta persona"];
          }
         const newRequest = new Request({
            user : {
                username : requestData.user.username,
                rut : requestData.user.rut,
                email : requestData.user.email
            },
            state : requestData.state,
         });

         await newRequest.save();
         return [newRequest, null];

    }catch(error){
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

        const requests = await Request.find();
        return [requests, null];

    }catch(error){
        handleError(error, "request.service -> getRequests");
        return [null, "Error al obtener las solicitudes servicio"];
    }

}

// GET BY ID
async function getRequestById(request) {
    try {
        const requestFound = await Request.findById(request).populate('user');
        return [requestFound, null];
    }catch(error){
        handleError(error, "request.service -> getRequestById");
        return [null, "Error al obtener la solicitud por id servicio"];
    }
}

export default {
    createRequest,
    deleteRequest,
    getRequests,
    getRequestById,
    updateRequest,
};