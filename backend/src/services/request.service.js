const user = require("../models/user.model");
const request = require("../models/request.model");
const document = require("../models/document.model");
const { handleError } = require("../utils/errorHandler.js");

async function createRequest(email, requestData) {
    try {
        const userFound = await user.findOne({email});

        if (!userFound) {
            return [null, "Usuario no encontrado"];
        }

        if (user.username !== requestData.user) {
            return [null, "El usuario no coincide"];
        }

        if (user.rut !== requestData.user) {
            return [null, "El rut no coincide"];
        }

        if (user.email !== requestData.user) {
            return [null, "El email no coincide"];
        }

        const requestFound = await request.findOne({"user.email": requestData.user.email});
        if (requestFound) {
            return [null, "Ya existe una solicitud"];
        }

        const newRequest = new request({
            user:{
                username: requestData.user.username,
                rut: requestData.user.rut,
                email: requestData.user.email,
            },
            
        });
        await newRequest.save();
        return [newRequest, null];

    }catch(error){
        handleError(error, "request.service -> createRequest");
    }

}
async function deleteRequest(req,res) {

    try{
        const requestDeleted = await request.findByIdAndDelete(request);
        return requestDeleted;
    }catch(error){
        handleError(error, "request.service -> deleteRequest");
    }
}

module.exports ={
    createRequest,
    deleteRequest,
};