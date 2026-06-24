<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loginType = ref('user')
const error = ref('')

function login() {
  const loginEmail =
    loginType.value === 'admin'
      ? 'admin@biblio.de'
      : email.value

  const success = authStore.login(loginEmail, password.value)

  if (!success) {
    error.value = 'E-Mail oder Passwort ist falsch.'
    return
  }

  if (authStore.isAdmin) {
    router.push('/admin')
  } else {
    router.push('/home')
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-card">
      <div class="icon-circle">
        <i class="bi bi-person-fill"></i>
      </div>

      <h1>Willkommen zurück</h1>
      <p class="subtitle">Melde dich an, um deine Bücherwelt zu erkunden.</p>

      <label>E-Mail-Adresse</label>
      <input v-model="email" type="email" placeholder="z. B. lisa@biblio.de" />

      <label>Passwort</label>
      <input v-model="password" type="password" placeholder="Passwort" @keyup.enter="login" />

      <div class="role-select">
        <label>
          <input type="radio" value="user" v-model="loginType" />
          Benutzer
        </label>

        <label>
          <input type="radio" value="admin" v-model="loginType" />
          Admin
        </label>
      </div>

      <button @click="login">Anmelden</button>

      <div class="register-link">
        Neu hier?
        <router-link to="/register">
          Registrieren
        </router-link>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="hint">
        Demo: lisa@biblio.de / user · admin@biblio.de / admin
      </p>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 75vh;
  background: var(--beige);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #f7f1e6;
  border: 1px solid var(--border);
  padding: 2.5rem 2rem;
  text-align: center;
}

.icon-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: var(--beige-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
}

.icon-circle i {
  font-size: 3rem;
  color: var(--accent);
}

h1 {
  font-family: Georgia, serif;
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

label {
  display: block;
  text-align: left;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

input {
  width: 100%;
  border: 1px solid #d7c1a6;
  border-radius: 7px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  background: white;
}

.role-select {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 0.5rem 0 1.5rem;
}

.role-select label {
  text-transform: none;
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.role-select input {
  width: auto;
  margin: 0;
}

button {
  width: 70%;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem;
  font-weight: 600;
  box-shadow: 0 3px 8px rgba(0,0,0,0.25);
}

.error {
  color: #a94442;
  margin-top: 1rem;
}

.hint {
  margin-top: 1.3rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.register-link {
  text-align: center;
  margin-top: 1rem;

  font-size: 0.85rem;
  color: var(--text-muted);
}

.register-link a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

</style>