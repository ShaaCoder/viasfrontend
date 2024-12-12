import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  phone: string;
  role: 'admin' | 'agent' | 'user';
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Mock users for demo
export const mockUsers = {
  '9876543210': { id: '1', phone: '9876543210', role: 'admin' },
  '9876543211': { id: '2', phone: '9876543211', role: 'agent' },
  '9876543212': { id: '3', phone: '9876543212', role: 'user' },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        // Clear any persisted state
        localStorage.removeItem('auth-storage');
        // Force reload to clear any cached state
        window.location.href = '/';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);