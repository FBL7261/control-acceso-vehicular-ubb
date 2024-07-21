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
      localStorage.setItem('user', JSON.stringify(decodedToken)); // Almacena el usuario en localStorage
      sessionStorage.setItem('token', data.data.accessToken); // Almacena el token en sessionStorage

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
    }
    return response; // Asegúrate de devolver la respuesta
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Log de errores
    throw new Error(error);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  sessionStorage.removeItem('token'); // Elimina el token de sessionStorage
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
