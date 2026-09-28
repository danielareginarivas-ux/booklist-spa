<template>
  <section class="lista">
    <h1>Catálogo de libros</h1>

    <FormularioLibro
      :libro-editando="libroEditando"
      @agregar="agregarLibro"
      @actualizar="actualizarLibro"
      @cancelar="cancelarEdicion"
    />

    <div class="filtros">
      <input
        v-model.trim="busqueda"
        type="search"
        placeholder="Buscar por autor..."
        class="filtros__input"
      />
      <select v-model="categoriaSeleccionada" class="filtros__select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categoriasDisponibles" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <button
        v-show="busqueda || categoriaSeleccionada"
        class="btn btn--secundario"
        @click="limpiarFiltros"
      >
        Limpiar filtros
      </button>
    </div>

    <p class="lista__contador">
      Mostrando {{ librosFiltrados.length }} de {{ libroStore.libros.length }} libro(s)
    </p>

    <p v-if="librosFiltrados.length === 0" class="lista__vacio">
      No hay libros disponibles con esos filtros.
    </p>

    <div v-else class="lista__grid">
      <Libro
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        :destacado="libroEditando && libroEditando.id === libro.id"
        @eliminar="eliminarLibro"
        @editar="iniciarEdicion"
      />
    </div>
  </section>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Libro from '../components/Libro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'
import { libroStore } from '../data/libros'

const busqueda = ref('')
const categoriaSeleccionada = ref('')

const categoriasDisponibles = computed(() =>
  [...new Set(libroStore.libros.map(l => l.categoria))].sort()
)

const librosFiltrados = computed(() =>
  libroStore.libros.filter(libro => {
    const coincideAutor = libro.autor
      .toLowerCase()
      .includes(busqueda.value.toLowerCase())
    const coincideCategoria =
      !categoriaSeleccionada.value || libro.categoria === categoriaSeleccionada.value
    return coincideAutor && coincideCategoria
  })
)

const libroEditando = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const idAEditar = route.query.editar
  if (idAEditar) {
    const libro = libroStore.obtenerPorId(idAEditar)
    if (libro) libroEditando.value = libro
    router.replace({ path: '/libros' })
  }
})

function agregarLibro(libro) {
  libroStore.agregarLibro(libro)
}

function iniciarEdicion(libro) {
  libroEditando.value = libro
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function actualizarLibro(id, datos) {
  libroStore.actualizarLibro(id, datos)
  libroEditando.value = null
}

function cancelarEdicion() {
  libroEditando.value = null
}

function eliminarLibro(id) {
  if (confirm('¿Seguro que querés eliminar este libro?')) {
    if (libroEditando.value && libroEditando.value.id === id) {
      libroEditando.value = null
    }
    libroStore.eliminarLibro(id)
  }
}

function limpiarFiltros() {
  busqueda.value = ''
  categoriaSeleccionada.value = ''
}
</script>

<style scoped>
.lista {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filtros {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.filtros__input, .filtros__select {
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--color-borde);
  background: var(--color-superficie);
  color: var(--color-texto);
  font-family: inherit;
}

.lista__contador {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-texto-suave);
}

.lista__vacio {
  text-align: center;
  padding: 2rem;
  color: var(--color-texto-suave);
  border: 1px dashed var(--color-borde);
  border-radius: 12px;
}

.lista__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
