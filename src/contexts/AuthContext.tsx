import React, { createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  viewHistory: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const viewHistory = async (password: string) => {
    return password === 'akhi';
  };

  return (
    <AuthContext.Provider value={{ viewHistory }}>
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