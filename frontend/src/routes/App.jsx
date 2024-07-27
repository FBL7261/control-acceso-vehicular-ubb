import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
//imports Felipe
import CreateRequest from '../components/CreateRequest';
import UserRequests from '../components/UserRequests';
import RequestList from '../components/RequestList';
//imports johan
import GuardHome from './HomeGuard';
import CreateRegEntry from "../components/CreateRegEntry.jsx";
import RegEntryList from '../components/RegEntryList';
import CreateRegEntryUser from '../components/CreateREUser.jsx';
import SearchEntry from '../components/SearchEntry.jsx';
//imports Cristopher
import VehiclesPage from '../pages/VehiclesPage';
import CreateVehicle from '../pages/CreateVehicle'; 
import DeleteVehiclePage from '../pages/DeleteVehiclePage';
import UserVehicles from '../pages/UserVehicles';
import UpdateVehicle from '../pages/UpdateVehicle'

import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create-request" element={<ProtectedRoute allowedRoles={['user']}><CreateRequest /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute allowedRoles={['user']}><UserRequests /></ProtectedRoute>} />
          <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><RequestList /></ProtectedRoute>} />
          {/* rutas johan */}
          <Route path="/guard-home" element={<ProtectedRoute allowedRoles={['guardia']}><GuardHome /></ProtectedRoute>} />
          <Route path="/create-reg-entry" element={<ProtectedRoute allowedRoles={['guardia']}><CreateRegEntry /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute allowedRoles={['guardia']}><RegEntryList /></ProtectedRoute>} />
          <Route path="/create-reg-entry-user" element={<ProtectedRoute allowedRoles={['guardia']}><CreateRegEntryUser /></ProtectedRoute>} />
          <Route path='/search-reg-by-date' element={<ProtectedRoute allowedRoles={['guardia']}><SearchEntry /></ProtectedRoute>} />
          <Route path='/search-reg-by-rut' element={<ProtectedRoute allowedRoles={['guardia']}><SearchEntry /></ProtectedRoute>} />
          <Route path='/search-reg-by-plate' element={<ProtectedRoute allowedRoles={['guardia']}><SearchEntry /></ProtectedRoute>} />
          {/* rutas Cristopher */}
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/create-vehicle" element={<ProtectedRoute><CreateVehicle /></ProtectedRoute>} />
          <Route path="/create-vehicle" element={<ProtectedRoute><CreateVehicle /></ProtectedRoute>} />
          <Route path="/vehicles/delete-vehicle" element={<ProtectedRoute><DeleteVehiclePage /></ProtectedRoute>} />
          <Route path="/vehicles/my-vehicles" element={<ProtectedRoute><UserVehicles /></ProtectedRoute>} />
          <Route path="/vehicles/update-vehicle" element={<ProtectedRoute><UpdateVehicle /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
