const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barcode: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 365 * 24 * 60 * 60 * 1000 // 1 year
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Credential', CredentialSchema);