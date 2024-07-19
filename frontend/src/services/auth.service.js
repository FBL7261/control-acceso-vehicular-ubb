import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const login = async ({ email, password }) => {
  try {
    console.log('Intentando iniciar sesión con:', email, password); // Log de credenciales
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });
    console.log('Respuesta del servidor:', response); // Log de la respuesta
    const { status, data } = response;
    if (status === 200) {
      const decodedToken = await jwtDecode(data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(decodedToken)); // Almacena el usuario en localStorage
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.accessToken}`;
      sessionStorage.setItem('usuario', JSON.stringify({ data: decodedToken })); // Asegúrate de almacenar el usuario en sessionStorage
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Log de errores
    throw new Error(error);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  sessionStorage.removeItem('usuario'); // Elimina el usuario de sessionStorage
};

export const test = async () => {
  try {
    const response = await axios.get('/users');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};