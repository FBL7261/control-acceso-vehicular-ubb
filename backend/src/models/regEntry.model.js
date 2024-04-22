const mongoose = require('mongoose');
const { default: stateEntry } = require('../constants/stateEntry.constants');

const regEntrySchema = new mongoose.Schema({    
    rut: {
        type: String,
        required: true,
        unique: true
    },
    plate: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: stateEntry,
        required: true
    },
    date: {
        type: Date,
        default: Date.now     
    },
    reason: {
        type: String,
        required: true
    },
});

const RegEntry = mongoose.model('RegEntry', regEntrySchema);
module.exports = RegEntry;