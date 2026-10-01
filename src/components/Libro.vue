<template>
    <article class="libro-card" :class="{ 'libro-card--destacado': destacado }">
    <div class="libro-card__header">
  <h3 class="libro-card__titulo">{{ libro.titulo }}</h3>

  <div class="libro-card__header-derecha">
    <span
      class="libro-card__categoria"
      :title="`Categoría: ${libro.categoria}`"
    >
      {{ libro.categoria }}
    </span>

    <button
      class="libro-card__favorito"
      :class="{ 'libro-card__favorito--activo': esFavorito }"
      :title="esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"
      @click="alternarFavorito"
    >
      {{ esFavorito ? '♥' : '♡' }}
    </button>
  </div>
</div>

    <p class="libro-card__autor">✍️ {{ libro.autor }}</p>

    <p v-if="libro.descripcion" class="libro-card__descripcion">
      {{ libro.descripcion }}
    </p>
    <p v-else class="libro-card__descripcion libro-card__descripcion--vacia">
      Sin descripción disponible.
    </p>

    <div class="libro-card__acciones">
      <router-link :to="`/libros/${libro.id}`" class="btn btn--secundario">
       
        Ver detalle
      </router-link>
      <button
        v-if="mostrarEditar"
        class="btn btn--secundario"
        @click="$emit('editar', libro)"
      >
        Editar
      </button>
      <button
        v-if="mostrarEliminar"
        class="btn btn--peligro"
        @click="$emit('eliminar', libro.id)"
      >
        Eliminar
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  libro: {
    type: Object,
    required: true
  },
  destacado: {
    type: Boolean,
    default: false
  },
  mostrarEliminar: {
    type: Boolean,
    default: true
  },
  mostrarEditar: {
    type: Boolean,
    default: true
  }
})

const esFavorito = computed(() =>
  store.getters['favoritos/esFavorito'](props.libro.id)
)

function alternarFavorito() {
  store.dispatch('favoritos/alternarFavorito', props.libro.id)
}

defineEmits(['eliminar', 'editar'])
</script>

<style scoped>
.libro-card {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.libro-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.libro-card--destacado {
  border-color: var(--color-primario);
}

.libro-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.libro-card__titulo {
  margin: 0;
  font-size: 1.1rem;
}

.libro-card__categoria {
  font-size: 0.75rem;
  background: var(--color-primario-suave);
  color: var(--color-primario);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  white-space: nowrap;
}

.libro-card__autor {
  margin: 0;
  color: var(--color-texto-suave);
  font-size: 0.9rem;
}

.libro-card__descripcion {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.libro-card__descripcion--vacia {
  font-style: italic;
  color: var(--color-texto-suave);
}

.libro-card__acciones {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.libro-card__header-derecha {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.libro-card__favorito {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1;
  padding: 0.2rem;
  color: var(--color-primario);
  transition: transform 0.15s ease;
}

.libro-card__favorito:hover {
  transform: scale(1.2);
}

.libro-card__favorito--activo {
  font-size: 1.5rem;
}
</style>
