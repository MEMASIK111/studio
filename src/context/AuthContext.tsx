// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth'; // Keep type for compatibility in other files

// Define a compatible User type
export type User = {
  displayName: string | null;
  email: string | null;
};

// Define the shape of the context's value
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, name?: string) => void;
  // This function now needs access to the cart clearing logic
  logout: (clearUserCart: () => void) => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that will wrap the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // No loading needed as auth state is instant
  const loading = false;

  const login = (email: string, name: string = 'Пользователь') => {
    setUser({ email, displayName: name });
  };
    
  const logout = (clearUserCart: () => void) => {
    setUser(null);
    clearUserCart(); // Explicitly clear the cart on logout
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
