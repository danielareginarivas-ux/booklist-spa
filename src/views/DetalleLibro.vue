<template>
  <section class="detalle" v-if="libro">
    <router-link to="/libros" class="detalle__volver">← Volver al catálogo</router-link>

    <div class="detalle__card">
      <div class="detalle__header">
        <h1>{{ libro.titulo }}</h1>
        <span class="detalle__categoria">{{ libro.categoria }}</span>
      </div>
      <p class="detalle__autor">✍️ {{ libro.autor }}</p>
      <p class="detalle__descripcion">
        {{ libro.descripcion || 'Este libro todavía no tiene descripción.' }}
      </p>

      <div class="detalle__acciones">
        <router-link
          :to="{ path: '/libros', query: { editar: libro.id } }"
          class="btn btn--secundario"
        >
          Editar libro
        </router-link>
        <button class="btn btn--peligro" @click="eliminar">Eliminar libro</button>
      </div>
    </div>
  </section>

  <section class="detalle detalle--vacio" v-else>
    <h1>Libro no encontrado</h1>
    <p>No existe ningún libro con el id <strong>{{ $route.params.id }}</strong>.</p>
    <router-link to="/libros" class="btn btn--primario">Volver al catálogo</router-link>
  </section>
</template>

<script setup>

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { libroStore } from '../data/libros'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const router = useRouter()

const libro = computed(() => libroStore.obtenerPorId(props.id))

function eliminar() {
  if (confirm('¿Seguro que querés eliminar este libro?')) {
    libroStore.eliminarLibro(libro.value.id)
    router.push('/libros')
  }
}
</script>

<style scoped>
.detalle__volver {
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--color-primario);
  text-decoration: none;
  font-size: 0.9rem;
}

.detalle__volver:hover {
  text-decoration: underline;
}

.detalle__card {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.detalle__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.detalle__header h1 {
  margin: 0;
}

.detalle__categoria {
  background: var(--color-primario-suave);
  color: var(--color-primario);
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.detalle__autor {
  margin: 0;
  color: var(--color-texto-suave);
}

.detalle__descripcion {
  margin: 0;
  line-height: 1.6;
}

.detalle__acciones {
  display: flex;
  gap: 0.6rem;
}

.detalle--vacio {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 0;
}
</style>
