import mongoose from 'mongoose';

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

    date: {
        type: Date,
        default: Date.now     
    },
    reason: {
        type: String,
        required: false
    },
});

const RegEntry = mongoose.model('RegEntry', regEntrySchema);
export default RegEntry;