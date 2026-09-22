<template>
  <div class="app">
    <header class="app__header">
      <router-link to="/" class="app__logo">&#128214 BookList</router-link>
      <nav class="app__nav">
        <router-link to="/" exact-active-class="app__nav-link--activo">Inicio</router-link>
        <router-link to="/libros" active-class="app__nav-link--activo">Libros</router-link>
      </nav>

        <div class="app__usuario">
        <template v-if="editandoNombre">
          <input
            v-model="nombreTemp"
            class="app__usuario-input"
            placeholder="Tu nombre"
            @keyup.enter="guardarNombre"
            @blur="guardarNombre"
            ref="inputNombre"
          />
        </template>
        <template v-else>
          <button class="app__usuario-nombre" @click="editarNombre" title="Click para cambiar tu nombre">
            👤 {{ nombreUsuario }} ✎
          </button>
        </template>
        <button class="app__contador" @click="incrementarContador">
          Clicks: {{ contador }}
        </button>
      </div>
    </header>

    <main class="app__main">
      <router-view />
    </main>

    <footer class="app__footer">
      <p>BookList SPA · Editorial Dany Agondi</p>
    </footer>
  </div>
</template>

<script>

import { usuarioStore, establecerNombre } from './data/usuario'
export default {
  name: 'App',

  data() {
    return {
      contador: 0,
      usuarioStore, 
      editandoNombre: false,
      nombreTemp: ''
    }
  },

  computed: {
        nombreUsuario() {
      return this.usuarioStore.nombre || 'Invitado/a'
    }
  },

  mounted() {
        if (!this.usuarioStore.nombre) {
      this.editarNombre()
    }
  },

  methods: {
    incrementarContador() {
      this.contador++
    },
    editarNombre() {
      this.nombreTemp = this.usuarioStore.nombre
      this.editandoNombre = true
      this.$nextTick(() => this.$refs.inputNombre?.focus())
    },
    guardarNombre() {
      if (this.nombreTemp.trim()) {
        establecerNombre(this.nombreTemp)
      }
      this.editandoNombre = false
    }
  }
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
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-borde);
  background: var(--color-superficie);
  position: sticky;
  top: 0;
  z-index: 10;
}

.app__logo {
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: none;
  color: var(--color-texto);
}

.app__nav {
  display: flex;
  gap: 1.5rem;
}

.app__nav a {
  text-decoration: none;
  color: var(--color-texto-suave);
  font-weight: 500;
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

.app__usuario-nombre {
  color: var(--color-texto-suave);
  background: none;
  border: none;
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.15rem 0.3rem;
  border-radius: 6px;
}

.app__usuario-nombre:hover {
  background: var(--color-fondo);
  color: var(--color-texto);
}

.app__usuario-input {
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--color-primario);
  width: 130px;
}

.app__contador {
  background: var(--color-primario-suave);
  color: var(--color-primario);
  border: none;
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}

.app__contador:hover {
  opacity: 0.85;
}

.app__main {
  flex: 1;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.app__footer {
  text-align: center;
  padding: 1.2rem;
  font-size: 0.8rem;
  color: var(--color-texto-suave);
  border-top: 1px solid var(--color-borde);
}
</style>
