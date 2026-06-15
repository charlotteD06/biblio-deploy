<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()

const name = ref(authStore.user?.name || '')
const email = ref(authStore.user?.email || '')
const bio = ref(authStore.user?.bio || '')
const profileImage = ref(authStore.user?.profileImage || '')
const saved = ref(false)

const yearlyGoal = ref(50)
const booksRead = ref(32)

const challengeProgress = computed(() =>
  Math.round((booksRead.value / yearlyGoal.value) * 100)
)

const booksLeft = computed(() =>
  Math.max(yearlyGoal.value - booksRead.value, 0)
)

function saveProfile() {
  authStore.updateUser({
    name: name.value,
    email: email.value,
    bio: bio.value,
    profileImage: profileImage.value
  })

  saved.value = true
  setTimeout(() => saved.value = false, 2500)
}
</script>

<template>
  <main class="profile-dashboard">
    <section class="profile-hero">
      <div>
        <p class="eyebrow">Profileinstellungen</p>
        <h1>
          Hallo,
          <span>{{ name || 'Leser:in' }}</span>
        </h1>
        <p>Bearbeite deine persönlichen Daten, dein Profilbild und deine Lieblingsinhalte.</p>
      </div>

      <div class="avatar-preview">
        <img v-if="profileImage" :src="profileImage" alt="Profilbild" />
        <i v-else class="bi bi-person-fill"></i>
      </div>
    </section>

    <div v-if="saved" class="alert alert-success save-alert">
      <i class="bi bi-check-circle me-2"></i>
      Dein Profil wurde gespeichert.
    </div>

    <section class="profile-grid">
      <article class="settings-card">
        <h2>Persönliche Daten</h2>

        <label>Profilname</label>
        <input v-model="name" />

        <label>E-Mail-Adresse</label>
        <input v-model="email" />

        <label>Profilbild URL</label>
        <input v-model="profileImage" placeholder="Link zu deinem Profilbild" />

        <label>Persönliche Beschreibung</label>
        <textarea v-model="bio"></textarea>

        <button @click="saveProfile">Änderungen speichern</button>
      </article>

      <aside class="side-card">
        <h2>Profilvorschau</h2>

        <div class="mini-profile">
          <div class="avatar-small">
            <img v-if="profileImage" :src="profileImage" alt="Profilbild" />
            <i v-else class="bi bi-person-fill"></i>
          </div>

          <h3>{{ name }}</h3>
          <p>{{ bio }}</p>
        </div>
      </aside>

      <article class="favorites-card">
        <div class="section-header">
          <h2>Lieblingsbücher</h2>
        </div>

        <div class="favorite-books">
          <div class="book-card">
            <img src="https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg" />
            <strong>A Little Life</strong>
            <span>Hanya Yanagihara</span>
          </div>

          <div class="book-card">
            <img src="https://covers.openlibrary.org/b/isbn/9780140449174-L.jpg" />
            <strong>Anna Karenina</strong>
            <span>Leo Tolstoy</span>
          </div>

          <div class="book-add-card">
            <i class="bi bi-plus-lg"></i>
            <span>Hinzufügen</span>
          </div>
        </div>
      </article>

      <article class="challenge-card">
        <div class="section-header">
          <h2>Challenge 2026</h2>
          <router-link to="/challenges">Details</router-link>
        </div>

        <div class="challenge-number">
          <strong>{{ booksRead }}</strong> / {{ yearlyGoal }} Bücher
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: challengeProgress + '%' }"
          ></div>
        </div>

        <p>Noch {{ booksLeft }} Bücher bis zu deinem Jahresziel.</p>

        <span class="challenge-badge">
          {{ challengeProgress }}% geschafft
        </span>
      </article>

      <article class="characters-card">
        <div class="section-header">
          <h2>Lieblingscharaktere</h2>
        </div>

        <div class="character-tags">
          <span>Jude St. Francis</span>
          <span>Willem Ragnarsson</span>
          <span>Anna Karenina</span>

          <span class="character-add">
            <i class="bi bi-plus-lg"></i>
          </span>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.profile-dashboard {
  min-height: calc(100vh - 80px);
  background:
    radial-gradient(circle at top right, rgba(138,161,177,0.16), transparent 34%),
    var(--beige);
  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.profile-hero {
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  margin-bottom: 0.4rem;
}

.profile-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(2.4rem, 5vw, 4rem);
  margin-bottom: 0.8rem;
}

.profile-hero h1 span {
  color: var(--accent);
  font-style: italic;
}

.profile-hero p {
  color: var(--text-muted);
  max-width: 620px;
}

.avatar-preview,
.avatar-small {
  border-radius: 50%;
  overflow: hidden;
  background: var(--beige-dark);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  min-width: 120px;
}

.avatar-preview img,
.avatar-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-preview i {
  font-size: 3.5rem;
}

.save-alert {
  max-width: 1200px;
  margin: 0 auto 1.5rem;
  border-radius: 14px;
}

.profile-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.settings-card,
.side-card,
.favorites-card,
.challenge-card,
.characters-card {
  background: rgba(247, 241, 230, 0.76);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 24px;
  padding: 1.6rem;
  box-shadow:
    0 12px 30px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.65);
  backdrop-filter: blur(10px);
}

.settings-card {
  grid-row: span 2;
}

.characters-card {
  grid-column: 1 / -1;
}

h2 {
  font-family: Georgia, serif;
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.35rem;
  color: var(--text-muted);
  font-size: 0.82rem;
}

input,
textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  background: rgba(255,255,255,0.85);
}

textarea {
  min-height: 130px;
}

.settings-card button {
  margin-top: 1.3rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.65rem 1.2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.14);
}

.mini-profile {
  text-align: center;
}

.avatar-small {
  width: 76px;
  height: 76px;
  margin: 0 auto 1rem;
}

.mini-profile p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.section-header a {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.9rem;
}

.favorite-books {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.book-card,
.book-add-card {
  width: 120px;
}

.book-card img {
  width: 95px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
}

.book-card strong,
.book-card span {
  display: block;
  font-size: 0.85rem;
}

.book-card span {
  color: var(--text-muted);
}

.book-add-card {
  width: 95px;
  height: 140px;
  border: 2px dashed var(--border);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(255,255,255,0.35);
  transition: all 0.2s ease;
}

.book-add-card:hover {
  transform: translateY(-2px);
}

.book-add-card i {
  font-size: 1.5rem;
  color: var(--accent);
}

.book-add-card span {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.challenge-number {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.challenge-number strong {
  font-size: 2rem;
  font-family: Georgia, serif;
}

.progress-bar {
  height: 12px;
  background: rgba(0,0,0,0.08);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 999px;
}

.challenge-card p {
  margin-top: 1rem;
  color: var(--text-muted);
}

.challenge-badge {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.4rem 0.9rem;
  background: rgba(138,161,177,0.15);
  color: var(--accent);
  border-radius: 999px;
  font-size: 0.85rem;
}

.character-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.character-tags span {
  background: var(--accent);
  color: #1e2a30;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 0 3px 8px rgba(0,0,0,0.12);
}

.character-add {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 48px;
  background: var(--beige);
  border: 1px dashed var(--border);
  cursor: pointer;
}

@media (max-width: 850px) {
  .profile-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }

  .settings-card {
    grid-row: auto;
  }

  .characters-card {
    grid-column: auto;
  }
}
</style>