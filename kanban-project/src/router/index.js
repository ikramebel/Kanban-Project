// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/project/:id',
    name: 'project-details',
    component: () => import('@/views/ProjectDetails.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation Guard global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Attendre que l'authentification soit initialisée
  if (authStore.loading) {
    // Créer une promesse qui attend la fin du chargement
    const unwatch = authStore.$subscribe((mutation, state) => {
      if (!state.loading) {
        unwatch();
        handleNavigation();
      }
    });
  } else {
    handleNavigation();
  }

  function handleNavigation() {
    const requiresAuth = to.meta.requiresAuth;
    const guestOnly = to.meta.guestOnly;
    const isAuthenticated = authStore.isAuthenticated();

    if (requiresAuth && !isAuthenticated) {
      // Rediriger vers la page de connexion si non authentifié
      next({ name: 'auth', query: { redirect: to.fullPath } });
    } else if (guestOnly && isAuthenticated) {
      // Rediriger vers le dashboard si déjà connecté
      next({ name: 'dashboard' });
    } else {
      next();
    }
  }
});

export default router;