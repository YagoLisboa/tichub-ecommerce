import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import ConsumerLayout from '../views/ConsumerLayout.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ConsumerLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'login', name: 'login', component: () => import('../views/LoginView.vue') },
        { path: 'product/:id', name: 'product-detail', component: () => import('../views/ProductDetailView.vue') }
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        { path: '', name: 'admin-dashboard', component: () => import('../views/AdminDashboard.vue') }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Consome o estado da centralização do Pinia
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' });
  }

  if (requiresAdmin && authStore.user?.role !== 'ADMIN') {
    return next({ name: 'home' });
  }

  next();
});

export default router;
