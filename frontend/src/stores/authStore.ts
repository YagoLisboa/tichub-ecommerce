import { defineStore } from 'pinia';

interface UserState {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserState | null,
    token: null as string | null,
    isAuthenticated: false,
    loading: false
  }),
  actions: {
    // Simulação reativa de Login com delay (UX Premium)
    async login(email: string, role: 'ADMIN' | 'CUSTOMER') {
      this.loading = true;
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          this.user = {
            id: 'u-100',
            username: email.split('@')[0]!,
            email: email,
            role: role // Permite testar dinamicamente as rotas protegidas
          };
          this.token = 'jwt-token-gerado-pelo-mock';
          this.isAuthenticated = true;
          this.loading = false;
          resolve(true);
        }, 1500);
      });
    },
    // Simulação de Logout limpando o estado global
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    }
  }
});
