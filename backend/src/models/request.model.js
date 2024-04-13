const mongoose = require('mongoose');
const STATES = require('../constants/state.constant');

const requestSchema = new mongoose.Schema({
    user:{
        type: {
            username: String,
            phone: String,
            email: String,
        },
    },
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true,
    },
    status: {
        type: String,
        enum: STATES,
        default: 'Pendiente',
    },

});


const Request = mongoose.model('Request', requestSchema);
module.export = Request;