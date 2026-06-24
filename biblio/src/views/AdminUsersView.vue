<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFriendsStore } from '../stores/friends'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const friendsStore = useFriendsStore()
const authStore = useAuthStore()

const users = computed(() => friendsStore.allUsers)

const search = ref('')

const filteredUsers = computed(() => {
  return friendsStore.allUsers.filter(user => {
    return user.name
      .toLowerCase()
      .includes(search.value.toLowerCase())
  })
})

function openProfile(id) {
  router.push(`/friends/${id}`)
}

function deleteUser(id) {
  const user = friendsStore.allUsers.find(u => u.id === id)

  if (!confirm(`User ${user.name} wirklich löschen?`)) return

  friendsStore.deleteUser(id)
}
</script>

<template>
  <main class="admin-users-page">

    <section class="search-section">
    <input
        v-model="search"
        class="search-input"
        placeholder="User suchen..."
    />
    </section>

    <section class="page-header">
      <h1>User Verwaltung</h1>
      <p>Alle registrierten Nutzer</p>
    </section>

    <section class="users-grid">

      <article
        v-for="user in filteredUsers"
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

        <div class="actions">

          <button
            class="profile-btn"
            @click="openProfile(user.id)"
          >
            Profil
          </button>

          <button
            class="delete-btn"
            @click="deleteUser(user.id)"
          >
            Löschen
          </button>

        </div>

      </article>

    </section>

  </main>
</template>
<style scoped>
.admin-users-page {
  min-height: calc(100vh - 80px);

  background:
    radial-gradient(circle at top right,
      rgba(138,161,177,.16),
      transparent 34%),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

/* HEADER */
.page-header {
  max-width: 1200px;
  margin: 0 auto 2.5rem;
}

.page-header h1 {
  font-family: Georgia, serif;
  font-size: 3rem;
  margin-bottom: .5rem;
}

.page-header p {
  color: var(--text-muted);
}

/* GRID -> DAS IST DER WICHTIGSTE FIX */
.users-grid {
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* CARD */
.user-card {
  background: rgba(247,241,230,.85);
  border-radius: 22px;

  padding: 1.5rem;

  border: 1px solid rgba(255,255,255,.6);

  box-shadow:
    0 10px 25px rgba(0,0,0,.08),
    inset 0 1px 0 rgba(255,255,255,.6);

  transition: .2s;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-card:hover {
  transform: translateY(-4px);
}

/* HEADER USER */
.user-top {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;

  background: var(--beige-dark);

  display: grid;
  place-items: center;

  color: var(--accent);
  font-size: 1.3rem;
}

.user-card h2 {
  margin: 0;
  font-family: Georgia, serif;
}

.user-card p {
  margin: 0;
  color: var(--text-muted);
  font-size: .9rem;
}

/* CURRENT BOOK BOX */
.current-book {
  background: rgba(255,255,255,.7);
  border-radius: 14px;

  padding: .9rem;

  border: 1px solid rgba(255,255,255,.6);
}

.label {
  font-size: .75rem;
  color: var(--text-muted);
  margin-bottom: .3rem;
}

/* BUTTONS */
.actions {
  display: flex;
  gap: .6rem;
  margin-top: auto;
}

.profile-btn,
.add-btn,
.delete-btn {
  border: none;
  border-radius: 999px;

  padding: .55rem 1rem;

  cursor: pointer;
  transition: .2s;
  font-size: .85rem;
}

/* styles */
.profile-btn {
  background: white;
  border: 1px solid var(--border);
}

.add-btn {
  background: var(--accent);
  color: white;
}

.delete-btn {
  background: #c97c7c;
  color: white;
}

.profile-btn:hover,
.add-btn:hover,
.delete-btn:hover {
  transform: translateY(-2px);
}

/* BACK BUTTON */
.back-btn {
  border: none;
  background: none;

  color: var(--text-muted);

  display: inline-flex;
  align-items: center;
  gap: .4rem;

  margin-bottom: 1.5rem;

  cursor: pointer;
}

.back-btn:hover {
  color: var(--accent);
}

/* ===== SEARCH SECTION WRAPPER ===== */
.search-section {
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: flex-start;
}

/* ===== SEARCH INPUT ===== */
.search-input {
  width: 100%;
  max-width: 420px;

  padding: 0.9rem 1rem;
  padding-left: 2.5rem;

  border-radius: 14px;

  border: 1px solid rgba(255,255,255,0.6);

  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(10px);

  box-shadow:
    0 8px 18px rgba(0,0,0,0.05),
    inset 0 1px 0 rgba(255,255,255,0.7);

  font-size: 0.95rem;

  color: var(--text);
  transition: all 0.2s ease;
}

/* PLACEHOLDER */
.search-input::placeholder {
  color: var(--text-muted);
}

/* HOVER */
.search-input:hover {
  transform: translateY(-1px);
}

/* FOCUS */
.search-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow:
    0 10px 22px rgba(0,0,0,0.08),
    0 0 0 3px rgba(138,161,177,0.2);
}


</style>