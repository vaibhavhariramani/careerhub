import { create } from "zustand";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null, isAdmin: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  setUser: (user, isAdmin) => set({ user, isAdmin, loading: false }),
}));
