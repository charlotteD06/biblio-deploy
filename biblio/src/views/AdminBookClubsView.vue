<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookClubStore } from '../stores/bookclubs'
import { useToastStore } from '../stores/toast'

const router = useRouter()

const bookClubStore = useBookClubStore()

const clubs = computed(() => bookClubStore.clubs)

const search = ref('')

const filteredClubs = computed(() => {
  return bookClubStore.clubs.filter(club => {
    return club.name
      .toLowerCase()
      .includes(search.value.toLowerCase())
  })
})

function showToast(message) {
  const toastEl = document.createElement('div')

  toastEl.className =
    'toast align-items-center text-white bg-success border-0 show position-fixed bottom-0 end-0 m-3'

  toastEl.role = 'alert'

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"></button>
    </div>
  `

  document.body.appendChild(toastEl)

  setTimeout(() => {
    toastEl.remove()
  }, 2500)
}

// EDIT
function editClub(id) {
  router.push(`/admin/bookclubs/${id}/edit`)
}

// DELETE
function deleteClub(id) {
  bookClubStore.clubs =
    bookClubStore.clubs.filter(c => c.id !== id)

  localStorage.setItem(
    'biblio-bookclubs',
    JSON.stringify(bookClubStore.clubs)
  )

  showToast('Buchclub gelöscht')
}
</script>

<template>

  <main class="admin-clubs-page">

    <section class="top-bar">

      <div class="search-wrapper">
        <input
          v-model="search"
          class="search-input"
          placeholder="Buchclub suchen..."
        />
      </div>

      <button class="back-btn" @click="$router.back()">
        ← Zurück
      </button>

    </section>

    <section class="page-header">

      <p class="eyebrow">
        Administration
      </p>

      <h1>
        Buchclubs verwalten
      </h1>

      <p>
        Übersicht über alle offiziellen und privaten Buchclubs.
      </p>

    </section>

    <section class="clubs-grid">

      <article
        v-for="club in filteredClubs"
        :key="club.id"
        class="club-card"
      >

        <div class="card-top">

          <h2>
            {{ club.name }}
          </h2>

          <span
            v-if="club.official"
            class="official-badge"
          >
            Offiziell
          </span>

          <span
            v-else
            class="private-badge"
          >
            Privat
          </span>

        </div>

        <p class="description">
          {{ club.description }}
        </p>

        <div class="info">

          <span>
            👥 {{ club.members.length }} Mitglieder
          </span>

          <span>
            👤 {{ club.createdBy }}
          </span>

        </div>

        <div class="actions">

          <button
            class="edit-btn"
            @click="editClub(club.id)"
          >
            Bearbeiten
          </button>

          <button
            class="delete-btn"
            @click="deleteClub(club.id)"
          >
            Löschen
          </button>

        </div>

      </article>

    </section>

  </main>

</template>

<style scoped>
.admin-clubs-page {
  min-height: calc(100vh - 80px);

  background:
    radial-gradient(circle at top right,
      rgba(138,161,177,.16),
      transparent 34%),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.page-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.eyebrow {
  color: var(--accent);

  text-transform: uppercase;

  letter-spacing: .08em;

  font-size: .8rem;
}

.page-header h1 {
  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 5vw, 4rem);
}

.page-header p {
  color: var(--text-muted);
}

.clubs-grid {
  max-width: 1200px;

  margin: auto;

  display: grid;

  grid-template-columns:
    repeat(auto-fill,minmax(350px,1fr));

  gap: 1.5rem;
}

.club-card {
  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 1.5rem;

  border: 1px solid rgba(255,255,255,.45);

  box-shadow:
    0 12px 30px rgba(0,0,0,.08);
}

.card-top {
  display: flex;

  align-items: center;

  gap: .75rem;

  margin-bottom: 1rem;
}

.card-top h2 {
  margin: 0;

  font-family: Georgia, serif;
}

.official-badge,
.private-badge {
  padding: .35rem .8rem;

  border-radius: 999px;

  font-size: .8rem;
}

.official-badge {
  background: rgba(138,161,177,.15);

  color: var(--accent);
}

.private-badge {
  background: rgba(212,184,150,.2);

  color: #8a6242;
}

.description {
  color: var(--text-muted);

  margin-bottom: 1rem;
}

.info {
  display: flex;

  flex-direction: column;

  gap: .4rem;

  margin-bottom: 1rem;
}

.actions {
  display: flex;

  gap: .75rem;
}

.edit-btn,
.delete-btn {
  border: none;

  border-radius: 999px;

  padding: .65rem 1rem;
}

.edit-btn {
  background: var(--accent);
  color: white;
}

.delete-btn {
  background: #c97c7c;
  color: white;
}

.back-link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.88rem;
  transition: 0.2s;
  margin-left: .1rem;
  margin-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: .4rem;
}

.back-link:hover {
  color: var(--accent);
}

.top-bar {
  max-width: 1200px;
  margin: 0 auto 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.search-wrapper {
  flex: 1;
  max-width: 420px;
}

.back-btn {
  border: none;
  background: transparent;

  color: var(--text-muted);
  font-size: 0.9rem;

  cursor: pointer;

  transition: 0.2s;
}

.back-btn:hover {
  color: var(--accent);
}

.search-input {
  width: 100%;
  max-width: 420px;

  padding: 0.9rem 1rem;
  padding-left: 2.6rem;

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

  margin-bottom: 1.5rem;
}

/* Placeholder */
.search-input::placeholder {
  color: var(--text-muted);
}

/* Hover */
.search-input:hover {
  transform: translateY(-1px);
}

/* Focus */
.search-input:focus {
  outline: none;
  border-color: var(--accent);

  box-shadow:
    0 10px 22px rgba(0,0,0,0.08),
    0 0 0 3px rgba(138,161,177,0.2);
}

/* Optional: Search Icon */
.search-wrapper {
  position: relative;
  max-width: 420px;
  margin-bottom: 1.5rem;
}

.search-wrapper::before {
  content: "🔍";
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.6;
  font-size: 0.95rem;
  pointer-events: none;
}
</style>