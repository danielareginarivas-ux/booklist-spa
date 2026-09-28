<template>
  <section class="inicio">
    <p class="inicio__saludo">Hola, <strong>{{ nombreUsuario }}</strong> 👋</p>

    <div class="inicio__panel">
      <div class="inicio__hero">
        <span class="inicio__badge">SPA · Gestión de libros</span>
        <h1>Bienvenido/a a <strong>BookList</strong></h1>
        <p>
          Gestiona el catálogo de Editorial Dany Agondi: registra libros,
          consulta detalles, filtra por autor o categoría, edita y elimina entradas.
        </p>
        <div class="inicio__acciones">
          <router-link to="/dashboard" class="btn btn--acento">Abrir Dashboard</router-link>
          <router-link to="/libros" class="btn btn--claro">Ver catálogo</router-link>
        </div>
      </div>

      <div class="inicio__card">
        <h2>Estado del catálogo</h2>
        <div class="inicio__fila">
          <span>Libros registrados</span>
          <strong>{{ totalLibros }}</strong>
        </div>
        <div class="inicio__fila">
          <span>Categorías distintas</span>
          <strong>{{ totalCategorias }}</strong>
        </div>
        <div class="inicio__fila">
          <span>Autores distintos</span>
          <strong>{{ totalAutores }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { libroStore } from '../data/libros'
import { authStore } from '../data/auth'

const nombreUsuario = computed(() => authStore.usuario || 'Usuario')
const totalLibros = computed(() => libroStore.libros.length)
const totalCategorias = computed(() => new Set(libroStore.libros.map(libro => libro.categoria)).size)
const totalAutores = computed(() => new Set(libroStore.libros.map(libro => libro.autor)).size)
</script>

<style scoped>
.inicio {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.inicio__saludo {
  margin: 0;
  color: var(--color-texto-suave);
}

.inicio__panel {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.5rem;
}

.inicio__hero {
  background: linear-gradient(135deg, var(--color-primario), #6c63f0);
  color: #fff;
  border-radius: 16px;
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.inicio__badge {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.18);
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.inicio__hero h1 {
  margin: 0;
  font-size: 2rem;
}

.inicio__hero p {
  margin: 0;
  line-height: 1.6;
  opacity: 0.92;
}

.inicio__acciones {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.btn--acento {
  background: #f5a623;
  color: #1f2430;
}

.btn--claro {
  background: #fff;
  color: var(--color-primario);
}

.inicio__card {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 16px;
  padding: 1.75rem;
}

.inicio__card h2 {
  margin-top: 0;
  font-size: 1.1rem;
}

.inicio__fila {
  display: flex;
  justify-content: space-between;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-borde);
}

.inicio__fila strong {
  color: var(--color-primario);
}

@media (max-width: 720px) {
  .inicio__panel {
    grid-template-columns: 1fr;
  }
}
</style>
