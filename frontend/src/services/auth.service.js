import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

// Define la URL de la API como una constante
const API_LOGIN_URL = 'http://localhost:3000/api/auth/login';

const login = async ({ email, password }) => {
  try {
    console.log('Intentando iniciar sesión con:', email, password);
    const response = await axios.post(API_LOGIN_URL, { email, password });
    console.log('Respuesta del servidor:', response); // Log de la respuesta

    const { status, data } = response;

    if (status === 200) {
      const { accessToken } = data.data;
      const decodedToken = jwtDecode(accessToken);
      console.log('Decoded Token:', decodedToken); // Verifica qué contiene el token decodificado

      // Almacena el usuario y el token
      localStorage.setItem('user', JSON.stringify(decodedToken));
      sessionStorage.setItem('token', accessToken);

      // Configura el token en los encabezados de Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    return response;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message || error);
    throw new Error(error.message || error);
  }
};

const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  sessionStorage.removeItem('token'); // Elimina el token de sessionStorage
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export { login, logout, getCurrentUser };
