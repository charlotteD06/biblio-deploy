<script setup>
import { computed } from 'vue'
import { useBookClubStore } from '../stores/bookclubs'
import { useToastStore } from '../stores/toast'

const bookClubStore = useBookClubStore()
const toastStore = useToastStore()

const clubs = computed(() => bookClubStore.clubs)

function deleteClub(clubId) {

  const confirmed = confirm(
    'Möchtest du diesen Buchclub wirklich löschen?'
  )

  if (!confirmed)
    return

  bookClubStore.clubs =
    bookClubStore.clubs.filter(
      club => club.id !== clubId
    )

  localStorage.setItem(
    'biblio-bookclubs',
    JSON.stringify(bookClubStore.clubs)
  )

  toastStore.trigger(
    'Buchclub gelöscht'
  )
}
</script>

<template>

  <main class="admin-clubs-page">

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
        v-for="club in clubs"
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
</style>