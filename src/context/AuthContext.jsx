import { createContext, useContext, useState} from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = '/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('luxe_user');
    return saved ? JSON.parse(saved) : null;
  });

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, { name, email, password });
      setUser(data.user);
      localStorage.setItem('luxe_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });
      setUser(data.user);
      localStorage.setItem('luxe_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxe_user');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
