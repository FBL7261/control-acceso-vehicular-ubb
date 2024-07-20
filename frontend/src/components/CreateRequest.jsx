import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../services/request.service";
import { useAuth } from '../context/AuthContext';

const CreateRequest = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    rut: "",
    email: "",
    description: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRequest = await createRequest({ 
        user: {
          username: formData.username,
          rut: formData.rut,
          email: formData.email
        },
        description: formData.description
      });
      alert('Request created successfully');
      console.log('Redirecting to /pdfs/subidaPDF with user ID:', user._id);
      navigate(`/pdfs/subidaPDF/${user._id}`);
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create request');
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="create-request-container">
      <h1>Create a Request</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>RUT</label>
          <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        <button type="submit">Create Request</button>
      </form>
    </div>
  );
};

export default CreateRequest;
