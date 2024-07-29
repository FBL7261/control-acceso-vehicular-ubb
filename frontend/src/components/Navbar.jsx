import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/auth.service.js';
import '../styles/Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = getCurrentUser();
    const userRole = storedUser?.roles?.[0];

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
                <li className={location.pathname === "/home" ? "active" : ""}>
                    <NavLink to="/home">Inicio</NavLink>
                </li>
                {userRole === 'admin' && (
                    <>
                        <li className={location.pathname === "/admin/requests" ? "active" : ""}>
                            <NavLink to="/admin/requests">Solicitudes</NavLink>
                        </li>
                    </>
                )}
                {userRole === 'guardia' && (
                    <>  
                        <li className={location.pathname === "/guard-home" ? "active" : ""}>
                            <NavLink to="/guard-home">Panel de Guardia</NavLink>
                        </li>
                    </>
                )}
                {userRole === 'guardia' && (
                    <>
                        <li className={location.pathname === "/search" ? "active" : ""}>
                            <NavLink to="/search">Registros</NavLink>
                        </li>
                    </>
                )}
                {userRole === 'user' && (
                    <>
                        <li className={location.pathname === "/create-request" ? "active" : ""}>
                        <NavLink to="/create-request">Crear Solicitud</NavLink>
                        </li>
                    </>
                )}
                {userRole === 'user' && (
                    <>
                        <li className={location.pathname === "/requests" ? "active" : ""}>
                        <NavLink to="/requests">Mis Solicitudes</NavLink>
                        </li>
                    </>
                )}
                <li className={location.pathname === '/vehicles' ? 'active' : ''}>
              <NavLink to="/vehicles">Vehículos</NavLink>
                </li>
                
                <li className={location.pathname === "/" ? "active" : ""}>
                    <NavLink to="/" onClick={logoutSubmit}>Cerrar Sesión</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
