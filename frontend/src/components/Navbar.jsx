// frontend/src/components/Navbar.jsx
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service.js'; // Importa la función logout

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = storedUser?.data?.rolName;

    const logoutSubmit = async () => {
        try {
            await logout(); // Llama a la función logout
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
                {userRole === 'administrador' && (
                    <li className={location.pathname === "/users" ? "active" : ""}>
                        <NavLink to="/users">Usuarios</NavLink>
                    </li>
                )}
                <li className={location.pathname === "/profile" ? "active" : ""}>
                    <NavLink to="/profile">Perfil</NavLink>
                </li>
                <li className={location.pathname === "/crear-solicitud" ? "active" : ""}>
                    <NavLink to="/crear-solicitud">Crear Solicitud</NavLink>
                </li>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
