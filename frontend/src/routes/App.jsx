// frontend/src/routes/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ProtectedRoute from '../components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        {/* Otras rutas protegidas */}
        <Route path="/" element={<Login />} /> {/* Redirigir a login si no autenticado */}
      </Routes>
    </Router>
  );
};

export default App;
