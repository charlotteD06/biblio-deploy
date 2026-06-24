<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFriendsStore } from '../stores/friends.js'
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()
const router = useRouter()
const friendsStore = useFriendsStore()

const search = ref('')

const users = computed(() => {

  return friendsStore.allUsers.filter(user => {

    const isFriend = friendsStore.friends.some(
      friend => friend.id === user.id
    )

    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(search.value.toLowerCase())

    return !isFriend && matchesSearch
  })
})

function addFriend(user) {
  friendsStore.addFriend(user)
  
  toastStore.trigger(
  `${user.name} wurde als Freund hinzugefügt`
)
}

function openProfile(id) {
  router.push(`/friends/${id}`)
}
</script>

<template>

<main class="users-page">

  <section class="users-hero">

    <button
      class="back-btn"
      @click="router.back()"
    >
      <i class="bi bi-arrow-left"></i>
      Zurück
    </button>

    <p class="eyebrow">
      Community
    </p>

    <h1>
      Nutzer entdecken
    </h1>

    <p>
      Finde neue Leserinnen und Leser und erweitere dein Netzwerk.
    </p>

    <input
      v-model="search"
      class="search-input"
      placeholder="Nach Nutzern suchen..."
    >

  </section>

  <section class="users-grid">

    <article
      v-for="user in users"
      :key="user.id"
      class="user-card"
    >

      <div class="user-top">

        <div class="avatar">
          <i class="bi bi-person-fill"></i>
        </div>

        <div>
          <h2>{{ user.name }}</h2>
          <p>{{ user.bio }}</p>
        </div>

      </div>

      <div class="current-book">

        <p class="label">
          Liest gerade
        </p>

        <button
          class="book-link"
          @click="router.push(`/product/${user.currentBook.id}`)"
        >
          {{ user.currentBook.title }}
        </button>

        <span>
          S. {{ user.currentBook.progress }}
        </span>

      </div>

      <div class="actions">

        <button
          class="profile-btn"
          @click="openProfile(user.id)"
        >
          Profil ansehen
        </button>

        <button
          class="add-btn"
          @click="addFriend(user)"
        >
          Freund hinzufügen
        </button>

      </div>

    </article>

  </section>

  <button
  v-if="authStore.isAdmin"
  class="delete-btn"
  @click="deleteUser(user.id)"
  >
  User löschen
  </button>

</main>

</template>

<style scoped>

.users-page {
  min-height: calc(100vh - 80px);

  background:
    radial-gradient(
      circle at top right,
      rgba(138,161,177,0.16),
      transparent 34%
    ),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.users-hero {
  max-width: 1200px;
  margin: 0 auto 2.5rem;
}

.back-btn {
  border: none;
  background: transparent;

  color: var(--text-muted);

  padding: 0;

  margin-bottom: 1.5rem;

  display: flex;
  align-items: center;
  gap: .4rem;
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: .08em;
  font-size: .78rem;
}

.users-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
}

.users-hero p {
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  max-width: 500px;

  padding: .85rem 1rem;

  border-radius: 14px;

  border: 1px solid var(--border);

  background: white;

  margin-top: 1rem;
}

.users-grid {
  max-width: 1200px;

  margin: auto;

  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(330px, 1fr));

  gap: 1.5rem;
}

.user-card {
  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 1.6rem;

  border: 1px solid rgba(255,255,255,.45);

  box-shadow:
    0 12px 30px rgba(0,0,0,.08),
    inset 0 1px 0 rgba(255,255,255,.7);
}

.user-top {
  display: flex;
  gap: 1rem;
  align-items: center;

  margin-bottom: 1rem;
}

.avatar {
  width: 58px;
  height: 58px;

  border-radius: 50%;

  background: var(--beige-dark);

  display: grid;
  place-items: center;

  color: var(--accent);
}

.current-book {
  background: rgba(255,255,255,.7);

  border-radius: 16px;

  padding: 1rem;

  margin-bottom: 1rem;
}

.book-link {
  border: none;
  background: transparent;

  padding: 0;

  color: var(--accent);

  font-weight: 600;
}

.actions {
  display: flex;
  gap: .75rem;
}

.profile-btn {
  border: 1px solid var(--border);

  background: white;

  border-radius: 999px;

  padding: .6rem 1rem;
}

.add-btn {
  border: none;

  border-radius: 999px;

  background: var(--accent);

  color: white;

  padding: .6rem 1rem;
}

</style>