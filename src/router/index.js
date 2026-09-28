import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../data/auth'
import LoginView from '../views/LoginView.vue'
import InicioView from '../views/InicioView.vue'
import DashboardView from '../views/DashboardView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'inicio',
    component: InicioView,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/libros',
    name: 'libros',
    component: ListaLibros,
    meta: { requiresAuth: true }
  },
  {
    path: '/libros/:id',
    name: 'detalle-libro',
    component: DetalleLibro,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authStore.autenticado) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  if (to.name === 'login' && authStore.autenticado) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
