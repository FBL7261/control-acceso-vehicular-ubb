import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import CreateRequest from '../components/CreateRequest';
import UserRequests from '../components/UserRequests';
import RequestList from '../components/RequestList';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import GuardHome from './HomeGuard'; // Importar GuardHome
import CreateRegEntry from "../components/createRegEntry.jsx"; // Importar CreateRegEntry
//import RegEntryList from './RegEntryList'; // Importar RegEntryList

function App() {
  return (
    <Router>
      <AuthProvider>

        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><UserRequests /></ProtectedRoute>} />
          <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><RequestList /></ProtectedRoute>} />
          <Route path="/guard-home" element={<ProtectedRoute allowedRoles={['guardia']}><GuardHome /></ProtectedRoute>} /> {/* Añadir ruta para GuardHome */}
          <Route path="/create-reg-entry" element={<ProtectedRoute allowedRoles={['guardia']}><CreateRegEntry /></ProtectedRoute>} /> {/* Añadir ruta para CreateRegEntry */}
          {/* <Route path="/reg-entries" element={<ProtectedRoute allowedRoles={['guard']}><RegEntryList /></ProtectedRoute>} /> Añadir ruta para RegEntryList */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/home" replace />} /> {/* Redirige a home si no se encuentra la ruta */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
