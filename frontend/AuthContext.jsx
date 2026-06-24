import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Memoize the API instance
  const api = useMemo(() => axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {
      'Content-Type': 'application/json'
    }
  }), []);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCurrentUser(response.data.user);
        } catch {
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, [api]); // Add api to dependencies

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.post('/login', { email, password });
      
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.post('/register', { email, password });
      
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoading,
      error,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};