import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import CreateRequest from '../components/CreateRequest';
import UserRequests from '../components/UserRequests';
import RequestList from '../components/RequestList';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import CreateVehicle from '../pages/CreateVehicle'; 
import UpdateVehiclePage from '../pages/UpdateVehiclePage';
import DeleteVehiclePage from '../pages/DeleteVehiclePage';
import UserVehicles from '../pages/UserVehicles';
import Error404 from './Error404';
import Profile from './Profile';
import VehiclesPage from '../pages/VehiclesPage';
import UpdateVehicleForm from '../components/UpdateVehicleForm';
import { useParams } from 'react-router-dom';

const UpdateVehicleFormWrapper = () => {

  const { vehicleId } = useParams();

  return <UpdateVehicleForm vehicleId={vehicleId} />;

};

const App = () => {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/create-vehicle" element={<ProtectedRoute><CreateVehicle /></ProtectedRoute>} />
          <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
          <Route path="/create-vehicle" element={<ProtectedRoute><CreateVehicle /></ProtectedRoute>} />
          <Route path="/vehicles/delete-vehicle" element={<ProtectedRoute><DeleteVehiclePage /></ProtectedRoute>} />
          <Route path="/vehicles/my-vehicles" element={<ProtectedRoute><UserVehicles /></ProtectedRoute>} />
          <Route path="/vehicles/update-vehicle" element={<ProtectedRoute><UpdateVehiclePage /></ProtectedRoute>} />
          <Route path="/vehicles/update-vehicle/updating/:vehicleId" element={<UpdateVehicleFormWrapper />} />
          <Route path="/requests" element={<ProtectedRoute><UserRequests /></ProtectedRoute>} />
          <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><RequestList /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
  );
};

export default App;
