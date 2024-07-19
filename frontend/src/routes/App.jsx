// frontend/src/routes/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from './Profile'; // Asegúrate de que esté importado correctamente
import CreateVehicle from './CreateVehicle'; // Importa el componente para crear vehículos
import UpdateVehicle from './UpdateVehicle'; // Importa el componente para actualizar vehículos
import DeleteVehicle from './DeleteVehicle'; // Importa el componente para eliminar vehículos
import ViewVehicles from './ViewVehicles'; // Importa el componente para ver vehículos
import ProtectedRoute from '../components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/create-vehicle" element={<ProtectedRoute><CreateVehicle /></ProtectedRoute>} />
        <Route path="/update-vehicle" element={<ProtectedRoute><UpdateVehicle /></ProtectedRoute>} />
        <Route path="/delete-vehicle" element={<ProtectedRoute><DeleteVehicle /></ProtectedRoute>} />
        <Route path="/view-vehicles" element={<ProtectedRoute><ViewVehicles /></ProtectedRoute>} />
        <Route path="/" element={<Login />} /> {/* Redirigir a login si no autenticado */}
      </Routes>
    </Router>
  );
};

export default App;
