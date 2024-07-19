// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';  // Importa el objeto por defecto

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar el estado de autenticación al cargar la aplicación
    const checkAuth = async () => {
      try {
        const user = await authService.profile();
        setUser(user);
      } catch (error) {
        console.log('No hay usuario autenticado');
      }
    };
    checkAuth();
  }, []);

  const loginUser = async (credentials) => {
    try {
      const user = await authService.login(credentials);
      setUser(user);
      navigate('/'); // Redirigir al usuario a la página principal
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    authService.logout();
    setUser(null);
    navigate('/login'); // Redirigir al usuario a la página de login
  };

  return (
    <AuthContext.Provider value={{ user, login: loginUser, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};