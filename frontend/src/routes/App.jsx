import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import CreateRequest from '../components/CreateRequest';
import SubidaPDFForm from '../components/SubidaPDFForm';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
          <Route path="/pdfs/subidaPDF" element={<ProtectedRoute><SubidaPDFForm /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
