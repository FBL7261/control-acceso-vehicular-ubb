import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import CreateRequest from '../components/CreateRequest';
import UserRequests from '../components/UserRequests';
import RequestList from '../components/RequestList';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import CreateVehicle from '../pages/CreateVehicle';
import UserVehicles from '../pages/UserVehicles';
import Error404 from './Error404';
import Profile from './Profile';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
          <Route path="/create-vehicle" element={<ProtectedRoute><CreateVehicle /></ProtectedRoute>} />
          <Route path="/my-vehicles" element={<ProtectedRoute><UserVehicles /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><UserRequests /></ProtectedRoute>} />
          <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><RequestList /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
