import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'professor' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated backend login action
  const login = async (user: User) => {
    setIsLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCurrentUser(user);
        setIsLoading(false);
        resolve();
      }, 1200);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
