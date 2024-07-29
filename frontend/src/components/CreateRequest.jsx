import React, { useState } from 'react';
import { createRequest } from '../services/request.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CreateRequest.css';

const CreateRequest = () => {
  const [username, setUsername] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('rut', rut);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('pdf', pdfFile);

    try {
      await createRequest(formData);
      toast.success('Solicitud enviada correctamente');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || 'No puedes enviar más de una solicitud';
        toast.error(errorMessage);
      } else {
        console.error('Error creating request:', error);
        toast.error('Error al enviar la solicitud');
      }
    }
  };

  return (
    <div className="create-request">
      <ToastContainer />
      <a href="#" className="back-button" onClick={() => window.history.back()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span className="ml-1 font-bold text-lg">Volver</span>
      </a>
      <h2>Crear Solicitud</h2>
      <h4>Por favor, rellene esta solicitud utilizando sus datos de usuario</h4>
      <h4>utilizados en su registro.</h4>
      <h2>________________________________________</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rut:</label>
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripcion:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Seleccionar PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CreateRequest;
