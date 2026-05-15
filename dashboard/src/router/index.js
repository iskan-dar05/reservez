
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth';  


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})



// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach((to, from ,next)=>{
  const authStore = useAuthStore();  
  const storedAuth = JSON.parse(localStorage.getItem('authStore'));

  // Restore user data from localStorage if not already set
  if (storedAuth && !authStore.user) {
    authStore.user = storedAuth.user;
  }

  if (!authStore.user && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
})

export default router
