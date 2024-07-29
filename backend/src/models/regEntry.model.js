import mongoose from 'mongoose';
const regEntrySchema = new mongoose.Schema({    
    rut: {
        type: String,
        required: true,
    },
    plate: {
        type: String,
        required: true,
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
        default: 'Estudio',
        required: true
    },
});

const RegEntry = mongoose.model('RegEntry', regEntrySchema);
export default RegEntry;