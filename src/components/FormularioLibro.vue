<template>
    <form class="formulario" @submit.prevent="enviar">
    <h2 class="formulario__titulo">
      {{ modoEdicion ? '&#128221; Editando libro' : '&#128193; Añadir un libro' }}
    </h2>

    <div class="campo">
      <label for="titulo">Título</label>
      <input
        id="titulo"
        v-model.trim="form.titulo"
        type="text"
        placeholder="Ej: Vidas Secas"
        @keyup.enter="enviar"
        required
      />
    </div>

    <div class="campo">
      <label for="autor">Autor</label>
      <input
        id="autor"
        v-model.trim="form.autor"
        type="text"
        placeholder="Ej: Graciliano Ramos"
        @keyup.enter="enviar"
        required
      />
    </div>

    <div class="campo">
      <label for="categoria">Categoría</label>
      <select id="categoria" v-model="form.categoria" required>
        <option value="" disabled>Seleccioná una categoría</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="campo">
      <label for="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        v-model.trim="form.descripcion"
        rows="3"
        placeholder="Breve resumen del libro (opcional)"
      ></textarea>
    </div>

      <div class="preview" v-if="form.titulo || form.autor">
      <p class="preview__label">Vista previa:</p>
      <p><strong>{{ form.titulo || '(sin título)' }}</strong> — {{ form.autor || '(sin autor)' }}</p>
      <p v-if="form.categoria" class="preview__categoria">{{ form.categoria }}</p>
    </div>

    <div class="formulario__acciones">
      <button type="submit" class="btn btn--primario">
        {{ modoEdicion ? 'Guardar cambios' : 'Añadir libro' }}
      </button>
      <button
        v-if="modoEdicion"
        type="button"
        class="btn btn--secundario"
        @click="cancelar"
      >
        Cancelar
      </button>
      <button
        v-else
        type="button"
        class="btn btn--secundario"
        @click.once="mostrarAyuda"
      >
        Ayuda
      </button>
    </div>

    <p v-if="mensajeError" class="formulario__error">{{ mensajeError }}</p>
  </form>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'


const props = defineProps({
  libroEditando: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['agregar', 'actualizar', 'cancelar'])

const categorias = ['Novela', 'Fantasía', 'Ensayo', 'Ciencia ficción', 'Poesía', 'Biografía', 'Otro']

const form = reactive({
  titulo: '',
  autor: '',
  categoria: '',
  descripcion: ''
})

const mensajeError = ref('')

const modoEdicion = computed(() => props.libroEditando !== null)

watch(
  () => props.libroEditando,
  libro => {
    if (libro) {
      form.titulo = libro.titulo
      form.autor = libro.autor
      form.categoria = libro.categoria
      form.descripcion = libro.descripcion || ''
      mensajeError.value = ''
    } else {
      limpiarForm()
    }
  },
  { immediate: true }
)

function limpiarForm() {
  form.titulo = ''
  form.autor = ''
  form.categoria = ''
  form.descripcion = ''
  mensajeError.value = ''
}

function enviar() {
  if (!form.titulo || !form.autor || !form.categoria) {
    mensajeError.value = 'Completá al menos título, autor y categoría.'
    return
  }
  mensajeError.value = ''

  if (modoEdicion.value) {
    emit('actualizar', props.libroEditando.id, { ...form })
  } else {
    emit('agregar', { ...form })
    limpiarForm()
  }
}

function cancelar() {
  emit('cancelar')
}

function mostrarAyuda() {
  alert('Completá el formulario y presioná "Añadir libro" o Enter en título/autor para agregarlo a la lista.')
}
</script>

<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 12px;
  padding: 1.25rem;
}

.formulario__titulo {
  margin: 0;
  font-size: 1.05rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-texto-suave);
}

input, select, textarea {
  font-family: inherit;
  font-size: 0.95rem;
  padding: 0.55rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--color-borde);
  background: var(--color-fondo);
  color: var(--color-texto);
}

input:focus, select:focus, textarea:focus {
  outline: 2px solid var(--color-primario);
  outline-offset: 1px;
}

.preview {
  background: var(--color-primario-suave);
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
}

.preview__label {
  margin: 0 0 0.2rem;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--color-primario);
}

.preview__categoria {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--color-texto-suave);
}

.formulario__acciones {
  display: flex;
  gap: 0.6rem;
}

.formulario__error {
  color: var(--color-peligro);
  font-size: 0.85rem;
  margin: 0;
}
</style>
