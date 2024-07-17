import mongoose from 'mongoose';

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
    default: () => Date.now() + 365 * 24 * 60 * 60 * 1000 // 1 año
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Credential = mongoose.model("Credential", CredentialSchema);

export default Credential;