import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service.js';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const userRole = user?.roles?.[0];

  const logoutSubmit = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        {isAuthenticated ? (
          <>
            <li className={location.pathname === '/home' ? 'active' : ''}>
              <NavLink to="/home">Inicio</NavLink>
            </li>
            {userRole === 'admin' && (
              <li className={location.pathname === '/admin/requests' ? 'active' : ''}>
                <NavLink to="/admin/requests">Solicitudes</NavLink>
              </li>
            )}
            <li className={location.pathname === '/create-request' ? 'active' : ''}>
              <NavLink to="/create-request">Crear Solicitud</NavLink>
            </li>
            <li className={location.pathname === '/vehicles' ? 'active' : ''}>
              <NavLink to="/vehicles">Vehículos</NavLink>
            </li>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
            </li>
          </>
        ) : (
          <li className={location.pathname === '/auth/login' ? 'active' : ''}>
            <NavLink to="/auth/login">Iniciar Sesión</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
