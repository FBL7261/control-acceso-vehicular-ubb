import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.data?.roles)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
