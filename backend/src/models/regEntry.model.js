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
        required: false
    },
});

// // Middleware para formatear la matrícula antes de guardar
// regEntrySchema.pre("save", function(next) {
//     const regEntry = this;
//     if (regEntry.isModified("plate")) {
//       regEntry.plate = formatPlate(regEntry.plate);
//     }
//     next();
//   });
//   // Función para formatear la matrícula
//     function formatPlate(plate) {
//         // Formato: XX.XX.XX
//         return plate.slice(0, 2) + "." + plate.slice(2, 4) + "." + plate.slice(4);
//     }

const RegEntry = mongoose.model('RegEntry', regEntrySchema);
export default RegEntry;