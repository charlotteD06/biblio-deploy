<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-fluid px-4">

      <router-link class="navbar-brand" to="/">Biblio</router-link>

      <button class="navbar-toggler navbar-toggler-sm py-1 px-2" type="button"
        data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">

        <ul class="navbar-nav me-auto gap-2 ms-3">
          <li class="nav-item"><a class="nav-link" href="#">Books</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Categories</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Community</a></li>
          <li class="nav-item"><a class="nav-link" href="#">About</a></li>
        </ul>

        <div class="d-flex align-items-center gap-3">

          <a href="#" class="nav-link"><i class="bi bi-search"></i></a>

          <!-- Neues Buch nur für Admin -->
          <router-link v-if="authStore.isAdmin" :to="{ name: 'create' }"
            class="btn btn-sm"
            style="background: var(--accent); color: #fff; border-radius: 50px; padding: 0.4rem 1.1rem;">
            <i class="bi bi-plus-lg me-1"></i>New Book
          </router-link>

          <!-- Login-Formular (nur wenn nicht eingeloggt) -->
          <div v-if="!authStore.isAdmin" class="d-flex gap-2 align-items-center">
            <input
              v-model="password"
              type="password"
              placeholder="Admin-Passwort"
              @keyup.enter="handleLogin"
              style="padding: 0.3rem 0.8rem; border: 1px solid var(--border);
                     border-radius: 50px; font-size: 0.8rem; outline: none;
                     background: var(--beige-dark); width: 140px;"
            />
            <button @click="handleLogin" class="btn btn-sm"
              style="background: var(--accent); color: #fff; border-radius: 50px;
                     padding: 0.3rem 0.9rem; font-size: 0.8rem; border: none;">
              Login
            </button>
          </div>

          <!-- Logout (nur wenn eingeloggt) -->
          <button v-else @click="authStore.logout()" class="btn btn-sm"
            style="background: transparent; border: 1px solid var(--border);
                   border-radius: 50px; padding: 0.3rem 0.9rem;
                   font-size: 0.8rem; color: var(--text-muted);">
            <i class="bi bi-box-arrow-right me-1"></i>Logout
          </button>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()
const password = ref('')

function handleLogin() {
  const success = authStore.login(password.value)
  if (!success) alert('Falsches Passwort.')
  password.value = ''
}
</script>

<style scoped>
.navbar {
  background-color: var(--beige);
  border-bottom: 1px solid var(--border);
}
.navbar-brand {
  font-family: 'Georgia', serif;
  font-size: 1.3rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--heading) !important;
  text-decoration: none;
}
.nav-link {
  color: var(--text) !important;
  font-size: 0.88rem;
}
.nav-link:hover { color: var(--accent) !important; }
.navbar-toggler {
  border: 1px solid var(--border);
  box-shadow: none;
  font-size: 0.7rem;
}
.navbar-toggler:focus { box-shadow: none; }
</style>