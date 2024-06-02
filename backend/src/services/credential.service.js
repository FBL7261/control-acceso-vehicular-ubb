import Credential from '../models/credential.model.js';
import { handleError }  from '../utils/errorHandler.js';
import mongoose from "mongoose"; 

async function createCredential(data) {
    const { userId, barcode } = data;
    const credential = new Credential({ userId, barcode });
    await credential.save();
    return credential;
  }

async function updateCredential(id, data) {
    const credential = await Credential.findById(id);
    if (!credential) throw new NotFoundError('Credencial no encontrada');
    Object.assign(credential, data);
    await credential.save();
    return credential;
  }

async function getAllCredential() {
    return await Credential.find();
  }

async function getOneCredential(id) {
    const credential = await Credential.findById(id);
    if (!credential) throw new NotFoundError('Credencial no encontrada');
    return credential;
  }

async function deleteCredential(credential) {
    const credentialdeteled = await Credential.findByIdAndDelete(credential);
    if (!credentialdeteled) throw new NotFoundError('Credencial no encontrada');
    return credentialdeteled;
  }


export default {
    createCredential,
    updateCredential,
    getAllCredential,
    getOneCredential,
    deleteCredential,
};