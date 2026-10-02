import { defineStore } from "pinia";
import { authClient } from "../lib/auth-client";

interface User {
  email: string
  name: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,

    initialized: false,
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    async initialize() {
      const { data: session } = await authClient.getSession()

      if (session?.user) {
        this.user = {
          email: session.user.email,
          name: session.user.name,
          role: session.user.role
        }
      } else {
        this.user = null;
      }

      this.initialized = true
    },

    setUser(user: User) {
      this.user = user;
    },

    clearUser() {
      this.user = null
    },

    async logout() {
      try {
        await authClient.signOut();
      } finally {
        this.clearUser();
      }
    },
  },

  persist: true,
});
