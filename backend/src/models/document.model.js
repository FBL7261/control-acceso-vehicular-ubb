import moongoose from 'mongoose';
import document from '../constants/document.constants.js';

const documentsSchema = new moongoose.Schema(
    {
        name: { type: String, required: true, enum: document}
    },
    { 
        versionKey: false, 
    },
);

const Document = moongoose.model("Document", documentsSchema);

export default Document;