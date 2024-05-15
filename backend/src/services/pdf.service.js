import PDFModel from "../models/pdf.model.js";
import { handleError } from "../utils/errorHandler";
import User from "../models/user.model.js";

async function createPDF(file, id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      const errorMessage = "No se encontro la persona";
      throw new Error(errorMessage);
    }
    const newPDF = new PDFModel({
      name: file.originalname,
      filePath: file.path,
      user: id,
      nombre: user.name,
    });

    const PDFSaved = await newPDF.save();
    return [PDFSaved, null];

  } catch (error) {
    const errorMessage = "No se pudo crear el PDF.";
    handleError(error, "pdfService -> createPDF", errorMessage);
    return [null, errorMessage];
  }
}

async function getPDF() {

  try {
    const pdf = await PDFModel.find();

    if (!pdf) {
      return [null, "No hay pdf en la base de datos"];
    }

    return [pdf, null];

  } catch (error) {
    handleError(error, "pdfService -> getPDF");
  }

}

async function getPDFsForPerson(personId) {

  try {

    const pdfs = await PDFModel.find({ user: personId });

    if (!pdfs) {
      return [null, "No hay pdfs para esta persona"];
    }

    return [pdfs, null];

  } catch (error) {
    handleError(error, "pdfService -> getPDFsForPerson");
  }

}

async function deletePDF(id) {

  try {

    const pdf = await PDFModel.findByIdAndDelete(id);

    if (!pdf) {
      return [null, "No se encontro el pdf"];
    }

    return [pdf, null];

  } catch (error) {
    handleError(error, "pdfService -> deletePDF");
  }
  
}

export default { 
    createPDF, 
    getPDF, 
    getPDFsForPerson, 
    deletePDF ,
};