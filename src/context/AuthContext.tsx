import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginValues, RegisterValues } from '../types';
import { loginApi, registerApi } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (values: LoginValues) => Promise<void>;
  register: (values: RegisterValues) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  );

  const login = async (values: LoginValues): Promise<void> => {
    const res = await loginApi(values);
    const { user: loggedUser, token: authToken } = res.data.data;
    setUser(loggedUser);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('token', authToken);
  };

  const register = async (values: RegisterValues): Promise<void> => {
    const res = await registerApi(values);
    const { user: registeredUser, token: authToken } = res.data.data;
    setUser(registeredUser);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(registeredUser));
    localStorage.setItem('token', authToken);
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
