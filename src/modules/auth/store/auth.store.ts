// =============================================================================
// Auth Zustand Store
// =============================================================================
// Global auth state management with persistence.
// Works alongside NextAuth for client-side state needs.
// =============================================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { AuthState, User } from '@/types/auth';
import { STORAGE_KEYS } from '@/constants/app';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () => {
        // Clear any stored tokens
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token');
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setUser: (user: User) => set({ user }),
    }),
    {
      name: STORAGE_KEYS.AUTH_STATE, // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
