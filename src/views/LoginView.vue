<template>
  <main class="login">
    <section class="login__card">
      <div class="login__brand">📚 BookList</div>
      <p class="login__eyebrow">Editorial Dany Agondi</p>
      <h1>Iniciar sesión</h1>
      <p class="login__intro">
        Accede al panel de gestión para administrar el catálogo de libros.
      </p>

      <form @submit.prevent="entrar" class="login__form">
        <div class="campo">
          <label for="usuario">Usuario</label>
          <input
            id="usuario"
            v-model.trim="usuario"
            type="text"
            autocomplete="username"
            placeholder="admin"
            required
          >
        </div>

        <div class="campo">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••"
            required
          >
        </div>

        <p v-if="error" class="login__error">{{ error }}</p>

        <button type="submit" class="btn btn--primario login__button">
          Entrar al sistema
        </button>
      </form>

      <div class="login__demo">
        <strong>Acceso de demostración</strong>
        <span>Usuario: <b>admin</b> · Contraseña: <b>123456</b></span>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { iniciarSesion } from '../data/auth'

const router = useRouter()
const usuario = ref('')
const password = ref('')
const error = ref('')

function entrar() {
  error.value = ''

  if (iniciarSesion(usuario.value, password.value)) {
    router.push('/dashboard')
    return
  }

  error.value = 'Usuario o contraseña incorrectos.'
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: var(--color-fondo);
}

.login__card {
  width: min(100%, 430px);
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
}

.login__brand {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primario);
}

.login__eyebrow {
  margin: 0.35rem 0 0;
  color: var(--color-texto-suave);
  font-size: 0.85rem;
}

.login h1 {
  margin: 1.5rem 0 0.4rem;
}

.login__intro {
  margin: 0 0 1.5rem;
  color: var(--color-texto-suave);
  line-height: 1.5;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.campo label {
  font-size: 0.85rem;
  font-weight: 600;
}

.campo input {
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--color-borde);
  border-radius: 8px;
  font: inherit;
  background: var(--color-fondo);
  color: var(--color-texto);
}

.login__button {
  width: 100%;
  margin-top: 0.25rem;
}

.login__error {
  margin: 0;
  color: var(--color-peligro);
  font-size: 0.85rem;
}

.login__demo {
  margin-top: 1.25rem;
  padding: 0.8rem;
  border-radius: 8px;
  background: var(--color-primario-suave);
  color: var(--color-texto-suave);
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
