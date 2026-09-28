import { iniciarSesion, cerrarSesion, authStore } from '../../src/data/auth'

describe('auth.js', () => {
  beforeEach(() => {
    cerrarSesion()
  })

  test('inicia sesión con las credenciales de demostración', () => {
    expect(iniciarSesion('admin', '123456')).toBe(true)
    expect(authStore.autenticado).toBe(true)
    expect(authStore.usuario).toBe('admin')
  })

  test('rechaza credenciales incorrectas', () => {
    expect(iniciarSesion('admin', 'incorrecta')).toBe(false)
    expect(authStore.autenticado).toBe(false)
  })

  test('cierra la sesión correctamente', () => {
    iniciarSesion('admin', '123456')
    cerrarSesion()
    expect(authStore.autenticado).toBe(false)
    expect(authStore.usuario).toBe('')
  })
})
