<template>
  <div class="app">
    <header v-if="estaAutenticado" class="app__header">
      <router-link to="/" class="app__logo">📚 BookList</router-link>

      <nav class="app__nav" aria-label="Navegación principal">
        <router-link to="/" exact-active-class="app__nav-link--activo">Inicio</router-link>
        <router-link to="/dashboard" active-class="app__nav-link--activo">Dashboard</router-link>
        <router-link to="/libros" active-class="app__nav-link--activo">Libros</router-link>
      </nav>

      <div class="app__usuario">
        <span>👤 {{ nombreUsuario }}</span>
        <button class="btn btn--secundario btn--pequeno" @click="salir">
          Cerrar sesión
        </button>
      </div>
    </header>

    <main :class="{ 'app__main': estaAutenticado, 'app__main--login': !estaAutenticado }">
      <router-view />
    </main>

    <footer v-if="estaAutenticado" class="app__footer">
      <p>BookList SPA · Editorial Dany Agondi</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { authStore, cerrarSesion } from './data/auth'

const router = useRouter()
const estaAutenticado = computed(() => authStore.autenticado)
const nombreUsuario = computed(() => authStore.usuario || 'Usuario')

function salir() {
  cerrarSesion()
  router.push('/login')
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-borde);
  background: var(--color-superficie);
  position: sticky;
  top: 0;
  z-index: 10;
}

.app__logo {
  font-weight: 800;
  font-size: 1.2rem;
  text-decoration: none;
  color: var(--color-texto);
}

.app__nav {
  display: flex;
  gap: 1.25rem;
}

.app__nav a {
  text-decoration: none;
  color: var(--color-texto-suave);
  font-weight: 600;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid transparent;
}

.app__nav a:hover {
  color: var(--color-texto);
}

.app__nav-link--activo {
  color: var(--color-primario) !important;
  border-bottom-color: var(--color-primario);
}

.app__usuario {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.85rem;
}

.btn--pequeno {
  padding: 0.4rem 0.7rem;
}

.app__main {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
}

.app__main--login {
  flex: 1;
}

.app__footer {
  text-align: center;
  padding: 1.2rem;
  font-size: 0.8rem;
  color: var(--color-texto-suave);
  border-top: 1px solid var(--color-borde);
}

@media (max-width: 820px) {
  .app__header {
    flex-wrap: wrap;
    padding: 1rem;
  }

  .app__nav {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .app__usuario {
    margin-left: auto;
  }
}
</style>
