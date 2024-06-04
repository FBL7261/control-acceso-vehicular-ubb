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
    status: {
        type: String,
        enum: STATES,
        default: 'Pendiente',
    },

});


const Request = mongoose.model('Request', requestSchema);

export default Request;