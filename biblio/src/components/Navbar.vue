<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-fluid px-4 nav-inner">

      <router-link class="navbar-brand" to="/" @click="closeMenu">
        Biblio
      </router-link>

<div class="nav-right"> 
  
  <button
    class="navbar-toggler py-1 px-2"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navMenu"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  
  <button
    v-if="authStore.isLoggedIn"
    class="profile-icon"
    @click="router.push('/profile')"
  >
    <img
      v-if="authStore.user?.profileImage"
      :src="authStore.user.profileImage"
      alt="Profilbild"
    />

    <i v-else class="bi bi-person-fill"></i>
  </button>

 
</div>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav me-auto gap-2 ms-3">

  <li class="nav-item">
    <router-link
      class="nav-link"
      :to="authStore.isUser ? '/home' : '/'"
      @click="closeMenu"
    >
      {{ authStore.isLoggedIn ? 'Home' : 'Startseite' }}
    </router-link>
  </li>

  <li class="nav-item" v-if="authStore.isUser">
    <router-link class="nav-link" to="/" @click="closeMenu">
      Beliebte Bücher
    </router-link>
  </li>

  <li class="nav-item" v-if="authStore.isUser">
    <router-link class="nav-link" to="/home" @click="closeMenu">
      Freunde
    </router-link>
  </li>

  <li class="nav-item" v-if="authStore.isUser">
    <router-link class="nav-link" to="/library" @click="closeMenu">
      Bibliothek
    </router-link>
  </li>

  <li class="nav-item" v-if="authStore.isUser">
    <router-link class="nav-link" to="/home" @click="closeMenu">
      Challenges
    </router-link>
  </li>

  <li class="nav-item" v-if="authStore.isUser">
    <router-link class="nav-link" to="/bookclubs" @click="closeMenu">
      Buchclubs
    </router-link>
  </li>

  <li class="nav-item" v-if="!authStore.isAdmin">
    <router-link class="nav-link" to="/kontakt" @click="closeMenu">
      Kontakt
    </router-link>
  </li>

  <li class="nav-item" v-if="!authStore.isLoggedIn">
    <router-link class="login-button" to="/login" @click="closeMenu">
      Anmelden
    </router-link>
  </li>


  <li class="nav-item" v-if="authStore.isAdmin">
    <router-link class="nav-link" :to="{ name: 'create' }" @click="closeMenu">
      New Book
    </router-link>
  </li>

  <li class="nav-item" v-if="authStore.isLoggedIn">
  <a
    class="nav-link logout-link"
    href="#"
    @click.prevent="logout"
  >
    Logout
  </a>
</li>

</ul>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  closeMenu()
  router.push('/')
}

function closeMenu() {
  const menu = document.getElementById('navMenu')

  if (menu?.classList.contains('show')) {
    window.bootstrap.Collapse.getOrCreateInstance(menu).hide()
  }
}
</script>

<style scoped>
.navbar {
  background-color: var(--beige);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
}

.navbar-brand {
  font-family: Georgia, serif;
  font-size: 1.3rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--heading) !important;
  text-decoration: none;
}

.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.nav-link {
  color: var(--text) !important;
  font-size: 0.88rem;
}

.nav-link:hover {
  color: var(--accent) !important;
}

.login-button {
  display: inline-block;

  background: var(--accent);
  color: white !important;

  border-radius: 30px;

  padding: 0.25rem 0.8rem;

  font-size: 0.75rem;
  font-weight: 400;

  text-decoration: none;

  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.profile-icon {
  width: 42px;
  height: 42px;

  min-width: 42px;
  min-height: 42px;

  border-radius: 50%;
  overflow: hidden;

  padding: 0;
  border: none;

  background: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-icon img {
  width: 42px;
  height: 42px;

  object-fit: cover;
  border-radius: 50%;

  display: block;
}

.profile-icon i {
  color: var(--accent);
  font-size: 1.1rem;
}

@media (max-width: 991px) {
  .navbar-collapse {
    width: 100%;
  }

  .navbar-nav {
    margin-top: 1rem;
    margin-left: 0 !important;
  }

  .logout-link {
  color: #b35f5f !important;
  font-weight: 500;
}

.logout-link:hover {
  color: #944949 !important;
}
}
</style>