import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ADMIN_USERNAME } from "../utils/constants";

interface AuthState {
  username: string | null;
  password: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  getAuthHeader: () => string | null;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      username: null,
      password: null,
      isAuthenticated: false,

      login: (username: string, password: string) => {
        set({
          username,
          password,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          username: null,
          password: null,
          isAuthenticated: false,
        });
      },

      getAuthHeader: () => {
        const { username, password } = get();

        if (!username || !password) {
          return null;
        }

        const credentials = btoa(`${username}:${password}`);
        return `Basic ${credentials}`;
      },

      isAdmin: () => {
        const { username } = get();
        return username === ADMIN_USERNAME;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
