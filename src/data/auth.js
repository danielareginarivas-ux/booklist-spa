import { computed, reactive } from 'vue'

const STORAGE_KEY = 'booklist_sesion'

const storedSession = localStorage.getItem(STORAGE_KEY)

export const authStore = reactive({
  autenticado: storedSession === 'true',
  usuario: localStorage.getItem('booklist_usuario') || ''
})

export const estaAutenticado = computed(() => authStore.autenticado)

export function iniciarSesion(usuario, password) {
  const usuarioValido = usuario.trim().toLowerCase() === 'admin'
  const passwordValida = password === '123456'

  if (!usuarioValido || !passwordValida) {
    return false
  }

  authStore.autenticado = true
  authStore.usuario = 'admin'
  localStorage.setItem(STORAGE_KEY, 'true')
  localStorage.setItem('booklist_usuario', 'admin')
  return true
}

export function cerrarSesion() {
  authStore.autenticado = false
  authStore.usuario = ''
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem('booklist_usuario')
}
