import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { uploadPDF } from "../services/pdf.service";
import NavBar from "../components/Navbar";

const SubidaPDFForm = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file && user?._id) {
        console.log('Uploading PDF for user ID:', user._id);
        await uploadPDF(file, user._id);
        alert("PDF uploaded successfully");
      } else {
        alert("Please select a file first or user ID is missing");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF");
    }
  };

  return (
    <>
      <NavBar />
      <div className="upload-pdf-container">
        <h1>Upload PDF</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select a PDF to upload</label>
            <input type="file" id="pdf" name="pdf" onChange={handleFileChange} required />
          </div>
          <button type="submit">Upload PDF</button>
        </form>
      </div>
    </>
  );
};

export default SubidaPDFForm;
