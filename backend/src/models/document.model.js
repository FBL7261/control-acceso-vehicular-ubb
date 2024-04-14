const moongoose = require('mongoose');
const document = require('../constants/document.constants.js');

const documentsSchema = new moongoose.Schema(
    {
        name: { type: String, required: true, enum: document}
    },
    { 
        versionKey: false, 
    },
);

const Document = moongoose.model("Document", documentsSchema);
module.exports = Document;