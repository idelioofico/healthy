import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'health_professional' | 'patient';
  healthUnitId?: string;
  healthUnitName?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (user, token) => set({ isAuthenticated: true, user, token }),
      logout: () => set({ isAuthenticated: false, user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// This is a mock function to simulate authentication
// In a real application, this would make an API request
export const loginUser = async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
  // Mock data for demonstration
  if (email === 'admin@example.com' && password === 'password') {
    return {
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      },
      token: 'mock-jwt-token-admin',
    };
  } else if (email === 'doctor@example.com' && password === 'password') {
    return {
      user: {
        id: '2',
        name: 'Dr. Maria Silva',
        email: 'doctor@example.com',
        role: 'health_professional',
        healthUnitId: '1',
        healthUnitName: 'Central Hospital',
      },
      token: 'mock-jwt-token-doctor',
    };
  }
  
  return null;
};