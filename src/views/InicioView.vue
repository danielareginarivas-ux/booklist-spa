<template>
  <section class="inicio">
    <p class="inicio__saludo-nombre">Hola, <strong>{{ nombreUsuario }}</strong> 👋</p>

    <div class="inicio__panel">
      <div class="inicio__hero">
        <span class="inicio__badge">Plataforma interna · Editorial Dany Agondi</span>
        <h1 class="inicio__titulo">
          Gestiona y controla el catálogo de <strong>Editorial Dany Agondi</strong>
        </h1>
        <p class="inicio__texto">
          La herramienta del equipo Dany Agondi para registrar libros,
          organizarlos por autor y categoría, y llevar el control de cada
          título en un solo lugar.
        </p>
        <router-link to="/libros" class="btn btn--acento inicio__cta">
          Ingresar al catálogo
        </router-link>
      </div>

      <div class="inicio__card">
        <h2 class="inicio__card-titulo">Estado del catálogo</h2>

        <div class="inicio__card-fila">
          <span>Libros registrados</span>
          <strong>{{ totalLibros }}</strong>
        </div>
        <div class="inicio__card-fila">
          <span>Categorías distintas</span>
          <strong>{{ totalCategorias }}</strong>
        </div>
        <div class="inicio__card-fila">
          <span>Autores distintos</span>
          <strong>{{ totalAutores }}</strong>
        </div>

        <router-link to="/libros" class="btn btn--primario inicio__card-boton">
          Ir al panel
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>

import { computed } from 'vue'
import { libroStore } from '../data/libros'
import { usuarioStore } from '../data/usuario'

const nombreUsuario = computed(() => usuarioStore.nombre || 'Invitado/a')

const totalLibros = computed(() => libroStore.libros.length)
const totalCategorias = computed(
  () => new Set(libroStore.libros.map(l => l.categoria)).size
)
const totalAutores = computed(
  () => new Set(libroStore.libros.map(l => l.autor)).size
)
</script>

<style scoped>
.inicio {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0 2rem;
}

.inicio__saludo-nombre {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-texto-suave);
}

.inicio__panel {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.inicio__hero {
  background: linear-gradient(135deg, var(--color-primario), #6c63f0);
  color: #fff;
  border-radius: 16px;
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.inicio__badge {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.18);
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.inicio__titulo {
  margin: 0;
  font-size: 2rem;
  line-height: 1.25;
}

.inicio__texto {
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
  max-width: 40ch;
}

.inicio__cta {
  align-self: flex-start;
  margin-top: 0.5rem;
}

.btn--acento {
  background: #f5a623;
  color: #1f2430;
}

.inicio__card {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.inicio__card-titulo {
  margin: 0 0 0.3rem;
  font-size: 1.1rem;
}

.inicio__card-fila {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--color-borde);
}

.inicio__card-fila strong {
  color: var(--color-primario);
  font-size: 1.1rem;
}

.inicio__card-boton {
  margin-top: 0.4rem;
  width: 100%;
}

@media (max-width: 720px) {
  .inicio__panel {
    grid-template-columns: 1fr;
  }
}
</style>
