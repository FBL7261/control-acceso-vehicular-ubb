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

      const userId = decodedToken.id || decodedToken.userId || decodedToken.sub; // Ajusta según la estructura de tu token
      if (userId) {
        sessionStorage.setItem('userId', userId); // Almacena el userId en sessionStorage
        console.log('User ID almacenado en sessionStorage:', userId); // Verificación de almacenamiento
      } else {
        console.error('User ID no encontrado en el token');
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
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
  sessionStorage.removeItem('token'); // Elimina el token de sessionStorage
  sessionStorage.removeItem('userId'); // Elimina el userId de sessionStorage
};
