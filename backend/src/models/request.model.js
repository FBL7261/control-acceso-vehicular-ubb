import mongoose from "mongoose";
import STATES from '../constants/request.state.constants.js';

const requestSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: STATES,
        default: 'Pendiente',
    },
    pdfs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PDF'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

requestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
