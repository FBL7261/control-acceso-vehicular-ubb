import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth.service'; // Asegúrate de importar correctamente el servicio de registro
import Form from './Form';
import ImgLogo from './ImgLogo';

const Register = () => {
    const navigate = useNavigate();

    const registerSubmit = async (data) => {
        try {
            const response = await register(data);
            if (response.data) {
                sessionStorage.setItem('usuario', JSON.stringify(response.data)); // Guarda el usuario en sessionStorage
                navigate('/home');
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <main className="container">
            <ImgLogo />
            <Form
                title="Crea tu cuenta"
                fields={[
                    {
                        label: "Nombre de usuario",
                        name: "username",
                        placeholder: "Didudo",
                        type: "text",
                        required: true,
                    },
                    {
                        label: "Correo electrónico",
                        name: "email",
                        placeholder: "example@gmail.com",
                        type: "email",
                        required: true,
                    },
                    {
                        label: "RUT",
                        name: "rut",
                        placeholder: "23.770.330-1",
                        type: "text",
                        required: true,
                    },
                    {
                        label: "Contraseña",
                        name: "password",
                        placeholder: "*********",
                        type: "password",
                        required: true,
                    },
                ]}
                buttonText="Registrarse"
                onSubmit={registerSubmit}
                footerContent={
                    <p>
                        ¿Ya tienes cuenta?, <a href="/">Inicia sesión aquí!</a>
                    </p>
                }
            />
        </main>
    );
};

export default Register;