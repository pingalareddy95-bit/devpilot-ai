import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: unknown | null;

  login: (user: unknown) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  user: null,

  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));