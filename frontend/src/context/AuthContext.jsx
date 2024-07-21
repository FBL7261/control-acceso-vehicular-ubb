// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) || "" : "";
  const isAuthenticated = !!user;
  
  useEffect(() => {
    const allowedRoutes = ['/auth/register', '/', '/auth/login'];
    if (!isAuthenticated && !allowedRoutes.includes(location.pathname)) {
      navigate("/");
    }
    if (isAuthenticated && allowedRoutes.includes(location.pathname)) {
      navigate("/home");
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
