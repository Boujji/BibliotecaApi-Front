import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthUser } from '@/types';
import type { LoginResponse } from '@/types';

interface SessionStore {
  // State
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  // Actions
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: AuthUser) => void;
  login: (response: LoginResponse) => void;
  logout: () => void;
  updateAccessToken: (accessToken: string) => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      // Initial state
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      // Actions
      setTokens: (accessToken: string, refreshToken: string) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      setUser: (user: AuthUser) =>
        set({
          user,
        }),

      login: (response: LoginResponse) => {
        console.log('Login response:', response)
        const { accessToken, refreshToken, ...userInfo } = response;
        set({
          accessToken: accessToken,
          refreshToken,
          user: userInfo as AuthUser,
          isAuthenticated: true,
        });
      },

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),

      updateAccessToken: (accessToken: string) =>
        set({
          accessToken,
        }),
    }),
    {
      name: 'session-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
