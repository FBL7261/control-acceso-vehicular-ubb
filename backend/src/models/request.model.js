import mongoose from "mongoose";
import STATES from '../constants/request.state.constants.js';

const requestSchema = new mongoose.Schema({
    user:{
        type: {
            username: String,
            rut: String,
            email: String,
        },
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: STATES,
        default: 'Pendiente',
    },
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