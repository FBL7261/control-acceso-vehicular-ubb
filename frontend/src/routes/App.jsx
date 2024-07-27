import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import CreateRequest from '../components/CreateRequest';
import UserRequests from '../components/UserRequests';
import RequestList from '../components/RequestList';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import GuardHome from './HomeGuard';
import CreateRegEntry from "../components/CreateRegEntry.jsx";
import RegEntryList from '../components/RegEntryList';
import CreateRegEntryUser from '../components/CreateREUser.jsx';
import SearchRegByDate from '../components/SearchRegByDate.jsx';
import SearchRegByPlate from '../components/SearchRegByPlate.jsx';
import SearchRegByRut from '../components/SearchRegByRut.jsx';
import SearchEntry from '../components/SearchEntry.jsx';

import Search from '../components/Search.jsx';

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
          <Route path="/guard-home" element={<ProtectedRoute allowedRoles={['guardia']}><GuardHome /></ProtectedRoute>} />
          <Route path="/create-reg-entry" element={<ProtectedRoute allowedRoles={['guardia']}><CreateRegEntry /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute allowedRoles={['guardia']}><RegEntryList /></ProtectedRoute>} />
          <Route path="/create-reg-entry-user" element={<ProtectedRoute allowedRoles={['guardia']}><CreateRegEntryUser /></ProtectedRoute>} />
          <Route path='/search-reg-by-date' element={<ProtectedRoute allowedRoles={['guardia']}><SearchEntry /></ProtectedRoute>} />
          <Route path='/search-by-date' element={<ProtectedRoute allowedRoles={['guardia']}><SearchRegByDate /></ProtectedRoute>} />
          <Route path='/search-reg-by-plate' element={<ProtectedRoute allowedRoles={['guardia']}><SearchEntry /></ProtectedRoute>} />
          <Route path='/search-by-plate' element={<ProtectedRoute allowedRoles={['guardia']}><SearchRegByPlate /></ProtectedRoute>} />
          <Route path='/search-reg-by-rut' element={<ProtectedRoute allowedRoles={['guardia']}><SearchRegByRut /></ProtectedRoute>} />
          <Route path='/search-totally' element={<ProtectedRoute allowedRoles={['guardia']}><Search /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/home" replace />} /> {/* Redirige a home si no se encuentra la ruta */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;