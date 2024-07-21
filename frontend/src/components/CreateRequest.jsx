import React, { useState } from 'react';
import { createRequest } from '../services/request.service';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateRequest.css'; // Importar el archivo CSS

const CreateRequest = () => {
  const [username, setUsername] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar los datos del formulario
    const formData = new FormData();
    formData.append('username', username);
    formData.append('rut', rut);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('pdf', pdfFile);

    try {
      // Llamar a la función de servicio para crear la solicitud
      await createRequest(formData);
      console.log('Request created');
      navigate('/home'); // Redirigir a /home después de crear la solicitud
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <div className="create-request">
      <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
      <h2>Crear Solicitud</h2>
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
