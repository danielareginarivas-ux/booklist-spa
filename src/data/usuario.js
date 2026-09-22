import { reactive, watch } from 'vue'

const CLAVE_STORAGE = 'booklist_nombre_usuario'

export const usuarioStore = reactive({
  nombre: localStorage.getItem(CLAVE_STORAGE) || ''
})

watch(
  () => usuarioStore.nombre,
  nombre => {
    localStorage.setItem(CLAVE_STORAGE, nombre)
  }
)

export function establecerNombre(nombre) {
  usuarioStore.nombre = nombre.trim()
}
