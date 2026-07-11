import { createRouter, createWebHistory } from 'vue-router';
import ConsumerLayout from '../views/ConsumerLayout.vue';
import HomeView from '../views/HomeView.vue';

// Estado simulado para validação do Guard (na Atividade 5 usaremos a Pinia store)
const mockUser = {
  isAuthenticated: true,
  role: 'ADMIN' // Altere para 'CUSTOMER' para testar o bloqueio do Admin Guard
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ConsumerLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'product/:id', name: 'product-detail', component: () => import('../views/ProductDetailView.vue') }
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }, // Metadados de segurança
      children: [
        { path: '', name: 'admin-dashboard', component: () => import('../views/AdminDashboard.vue') }
      ]
    }
  ]
});

// Guard Global de Proteção (beforeEach)
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !mockUser.isAuthenticated) {
    // Se não autenticado, barra o acesso (redirecionaria para login)
    return next({ name: 'home' });
  }

  if (requiresAdmin && mockUser.role !== 'ADMIN') {
    // Se não for ADMIN, bloqueia a navegação para a área de gestão
    alert('Acesso negado! Área exclusiva para administradores.');
    return next({ name: 'home' });
  }

  next();
});

export default router;
