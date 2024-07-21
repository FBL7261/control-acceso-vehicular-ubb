import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import CreateRequest from '../components/CreateRequest';
import UserRequests from '../components/UserRequests';
import RequestList from '../components/RequestList';
import Vehicles from '../components/Vehicles';
import CreateVehicle from '../components/CreateVehicle'; // Importar CreateVehicle
import MyVehicles from '../components/MyVehicles'; // Importar MyVehicles
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar'; // Barra de navegación

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {/* Mueve esto si quieres que solo se muestre en rutas protegidas */}
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><UserRequests /></ProtectedRoute>} />
          <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><RequestList /></ProtectedRoute>} />
          <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
          <Route path="/create-vehicle" element={<ProtectedRoute><CreateVehicle /></ProtectedRoute>} /> {/* Nueva ruta */}
          <Route path="/my-vehicles" element={<ProtectedRoute><MyVehicles /></ProtectedRoute>} /> {/* Nueva ruta */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/home" replace />} /> {/* Redirige a home si la ruta no se encuentra */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
