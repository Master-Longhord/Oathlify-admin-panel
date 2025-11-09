import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginAdmin, type LoginResponse } from '../services/authService';
import apiClient from '../services/apiClient';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { tokens, user } = await loginAdmin(email, password);
    setAccessToken(tokens.accessToken);
    setUser(user);
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete apiClient.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
