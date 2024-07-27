import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });
    const { status, data } = response;
    if (status === 200) {
      const decodedToken = jwtDecode(data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(decodedToken));
      sessionStorage.setItem('token', data.data.accessToken);

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
    }
    return response;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error(error);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  sessionStorage.removeItem('token');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
