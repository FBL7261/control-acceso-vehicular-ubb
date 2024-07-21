import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const login = async ({ email, password }) => {
  try {
    console.log('Intentando iniciar sesión con:', email, password);
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });

    console.log('Respuesta del servidor:', response); // Log de la respuesta
    const { status, data } = response;

    if (status === 200) {
      const decodedToken = jwtDecode(data.data.accessToken);
      console.log('Decoded Token:', decodedToken); // Verifica qué contiene el token decodificado

      // Almacena el usuario en localStorage y el token en sessionStorage
      localStorage.setItem('user', JSON.stringify(decodedToken));
      sessionStorage.setItem('token', data.data.accessToken);

      // Configura el token en los headers de axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
    }

    return response;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  sessionStorage.removeItem('token'); // Elimina el token de sessionStorage
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

export default {
  login,
  logout,
  getCurrentUser,
};
