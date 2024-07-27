import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/auth.service.js';

const NavbarGuard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = getCurrentUser();
    const userRole = storedUser?.roles?.[0]; // Ajusta según la estructura de tu objeto de usuario

    const logoutSubmit = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    if (userRole !== 'guardia') {
        return null; // No mostrar nada si el usuario no es un guardia
    }

    return (
        <nav className="navbar-guard">
            <ul>
                <li className={location.pathname === "/guard-home" ? "active" : ""}>
                    <NavLink to="/guard-home">Panel de Guardia</NavLink>
                </li>
                {/* <li className={location.pathname === "/reg-entries" ? "active" : ""}>
                    <NavLink to="/reg-entries">Ver Entradas</NavLink>
                </li> */}
                <li className={location.pathname === "/" ? "active" : ""}>
                    <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarGuard;