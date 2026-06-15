<template>
  <main class="auth-page">

    <div class="auth-card">

      <div class="logo">
        BIBLIO
      </div>

      <div class="icon-circle">
        <i class="bi bi-book"></i>
      </div>

      <h1>Konto erstellen</h1>

      <p class="subtitle">
        Tritt unserer Gemeinschaft leidenschaftlicher Leser bei.
      </p>

      <form @submit.prevent="register">

        <label>Profilname</label>
        <input
          v-model="name"
          type="text"
          placeholder="Dein Name"
        >

        <label>E-Mail-Adresse</label>
        <input
          v-model="email"
          type="email"
          placeholder="name@email.de"
        >

        <label>Passwort</label>
        <input
          v-model="password"
          type="password"
          placeholder="Passwort"
        >

        <label>Passwort bestätigen</label>
        <input
          v-model="passwordRepeat"
          type="password"
          placeholder="Passwort wiederholen"
        >

        <button type="submit">
          Konto erstellen
        </button>

      </form>

      <div
        v-if="message"
        class="alert alert-success mt-3"
      >
        {{ message }}
      </div>

      <div class="login-link">
        Bereits Mitglied?
        <router-link to="/login">
          Anmelden
        </router-link>
      </div>

    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordRepeat = ref('')

const message = ref('')

function register() {

  if (password.value !== passwordRepeat.value) {
    message.value = 'Passwörter stimmen nicht überein.'
    return
  }

  message.value =
    'Registrierung ist in der Demo deaktiviert. Bitte nutze einen Testaccount.'
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--beige);
}

.auth-card {
  width: 100%;
  max-width: 450px;

  background: var(--beige-dark);

  border: 1px solid var(--border);
  border-radius: 20px;

  padding: 2.5rem;
}

.logo {
  text-align: center;

  font-family: Georgia, serif;
  font-size: 2rem;

  margin-bottom: 2rem;
}

.icon-circle {
  width: 90px;
  height: 90px;

  margin: 0 auto 1.5rem;

  border-radius: 50%;

  background: var(--beige);

  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-circle i {
  font-size: 2.2rem;
  color: var(--accent);
}

h1 {
  text-align: center;
  font-family: Georgia, serif;
}

.subtitle {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.3rem;

  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--text-muted);
}

input {
  width: 100%;

  padding: 0.8rem;

  border: 1px solid var(--border);
  border-radius: 12px;

  background: white;
}

button {
  width: 100%;
  margin-top: 1.5rem;

  border: none;
  border-radius: 50px;

  padding: 0.9rem;

  background: var(--accent);
  color: white;
}

.login-link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.login-link a {
  color: var(--accent);
  text-decoration: none;
}
</style>