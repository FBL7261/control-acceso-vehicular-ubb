const Credential = require('../models/Credential');
const { BadRequestError, NotFoundError } = require('../utils/errors');

class CredentialService {
  async create(data) {
    const { userId, barcode } = data;
    const credential = new Credential({ userId, barcode });
    await credential.save();
    return credential;
  }

  async update(id, data) {
    const credential = await Credential.findById(id);
    if (!credential) throw new NotFoundError('Credencial no encontrada');
    Object.assign(credential, data);
    await credential.save();
    return credential;
  }

  async getAll() {
    return await Credential.find();
  }

  async getOne(id) {
    const credential = await Credential.findById(id);
    if (!credential) throw new NotFoundError('Credencial no encontrada');
    return credential;
  }

  async delete(id) {
    const credential = await Credential.findByIdAndRemove(id);
    if (!credential) throw new NotFoundError('Credencial no encontrada');
    return credential;
  }
}

module.exports = new CredentialService();