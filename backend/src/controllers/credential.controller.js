

import { respondSuccess, respondError } from "../utils/resHandler.js";
import CredentialService from "../services/credential.service.js";
import { credentialsBodySchema } from "../schema/credential.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function createCredentials(req, res) {
    try {
      const { body } = req;
      const { error: bodyError } = credentialsBodySchema.validate(body);
      if (bodyError) return respondError(req, res, 400, bodyError.message);

      const credential = await CredentialService.createCredential(body);
      respondSuccess(req, res, 201, credential);
    } catch (error) {
      handleError(error, "credentials.controller -> createCredentials");
      respondError(req, res, 500, "No se creo la credencial");
    }
  }

async function updateCredentials(req, res) {
    try {
      const { params, body } = req;
      const credential = await CredentialService.updateCredential(params.id, body);
      respondSuccess(req, res, 200, credential);
    } catch (error) {
      handleError(error, "credentials.controller -> updateCredentials");
      respondError(req, res, 400, "No se pudo actualizar la credencial");
    }
  }

async function getAllCredentials(req, res) {
    try {
      const credentials = await CredentialService.getAllCredential();
      respondSuccess(req, res, 200, credentials);
    } catch (error) {
      handleError(error, "credentials.controller -> getAllCredentials");
      respondError(req, res, 500, "No se pudo obtener las credenciales");
    }
  }

async function getOneCredential(req, res) {
    try {
      const { params } = req;
      const credential = await CredentialService.getOneCredential(params.id);
      respondSuccess(req, res, 200, credential);
    } catch (error) {
      handleError(error, "credentials.controller -> getOneCredential");
      respondError(req, res, 404, "Credencial no encontrada");
    }
  }

async function deleteCredential(req, res) {
    try {
      const credential = req.params.id;
      const credentialdeteled = await CredentialService.deleteCredential(credential);
      respondSuccess(req, res, 200, credentialdeteled);
    } catch (error) {
      handleError(error, "credential.controller -> deleteCredential");
      respondError(req, res, 404, "Credencial no encontrada");
    }
  }

export default {
  createCredentials,
  updateCredentials,
  getAllCredentials,
  getOneCredential,
  deleteCredential,
};