// src/pages/login.jsx

import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service'; // Importa el objeto por defecto
import Form from '../components/Form';
import ImgLogo from '../components/ImgLogo';

const Login = () => {
    const navigate = useNavigate();

    const loginSubmit = (data) => {
        authService.login(data).then(() => {
            navigate('/home');
        }).catch((error) => {
            console.error('Error al iniciar sesión:', error);
        });
    };

    return (
        <main className="container">
            <ImgLogo />
            <Form
                title="Iniciar sesión"
                fields={[
                    {
                        label: "Correo electrónico",
                        name: "email",
                        placeholder: "example@gmail.com",
                        type: "email",
                        required: true,
                    },
                    {
                        label: "Contraseña",
                        name: "password",
                        placeholder: "**********",
                        type: "password",
                        required: true,
                    },
                ]}
                buttonText="Iniciar sesión"
                onSubmit={loginSubmit}
                footerContent={
                    <p>
                        ¿No tienes cuenta?, <a href="/register">Regístrate aquí!</a>
                    </p>
                }
            />
        </main>
    );
};

export default Login;
