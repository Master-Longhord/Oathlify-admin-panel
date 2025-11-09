import { createContext, useContext } from 'react';
import type { LoginResponse } from '../services/authService';

interface AuthContextType {
  accessToken: string | null;
  user: LoginResponse['user'] | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
