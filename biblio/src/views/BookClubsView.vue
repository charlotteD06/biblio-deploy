<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookClubStore } from '../stores/bookclubs'

const router = useRouter()
const bookClubStore = useBookClubStore()

const search = ref('')

const filteredOfficialClubs = computed(() =>
  bookClubStore.clubs.filter(club =>
    club.official &&
    club.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const filteredCommunityClubs = computed(() =>
  bookClubStore.clubs.filter(club =>
    !club.official &&
    club.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function openClub(clubId) {
  router.push(`/bookclubs/${clubId}`)
}

function createClub() {
  router.push('/bookclubs/create')
}
</script>

<template>
  <main class="clubs-page">

    <section class="clubs-hero">

      <div>
        <p class="eyebrow">Community</p>

        <h1>Buchclubs</h1>

        <p>
          Entdecke offizielle und private Buchclubs,
          tritt ihnen bei und diskutiere gemeinsam Bücher.
        </p>
      </div>

      <button
        class="create-btn"
        @click="createClub"
      >
        <i class="bi bi-plus-lg"></i>
        Buchclub erstellen
      </button>

    </section>

    <section class="search-section">

      <input
        v-model="search"
        class="search-input"
        placeholder="Buchclub suchen..."
      />

    </section>

    <section class="club-section">

      <h2>Offizielle Buchclubs</h2>

      <div class="club-grid">

        <article
          v-for="club in filteredOfficialClubs"
          :key="club.id"
          class="club-card"
        >

          <div class="card-header">

            <span class="official-badge">
              ✓ Offiziell
            </span>

          </div>

          <h3>{{ club.name }}</h3>

          <p>
            {{ club.description }}
          </p>

      <div class="club-info">

        <div class="info-item">
          <strong>Aktuelles Buch</strong>
          <span>{{ club.currentBook.title }}</span>
        </div>

        <div class="info-item">
          <strong>Nächstes Treffen</strong>
          <span>{{ club.nextMeeting.date }}</span>
        </div>

        <div class="info-item">
          <strong>Mitglieder</strong>
          <span>{{ club.members.length }}</span>
        </div>

      </div>

          <button
            class="details-btn"
            @click="openClub(club.id)"
          >
            Details ansehen
          </button>

        </article>

      </div>

    </section>

    <section class="club-section">

      <h2>Private Buchclubs</h2>

      <div class="club-grid">

        <article
          v-for="club in filteredCommunityClubs"
          :key="club.id"
          class="club-card"
        >

          <h3>{{ club.name }}</h3>

          <p>
            {{ club.description }}
          </p>

<div class="club-info">

      <div class="info-item">
        <strong>Erstellt von</strong>
        <span>{{ club.createdBy }}</span>
      </div>

      <div class="info-item">
        <strong>Mitglieder</strong>
        <span>{{ club.members.length }}</span>
      </div>

      </div>

          <button
            class="details-btn"
            @click="openClub(club.id)"
          >
            Details ansehen
          </button>

        </article>

      </div>

    </section>

  </main>
</template>

<style scoped>
.clubs-page {
  min-height: calc(100vh - 80px);

  background:
    radial-gradient(circle at top right,
      rgba(138,161,177,.16),
      transparent 34%),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.clubs-hero {
  max-width: 1200px;

  margin: 0 auto 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.eyebrow {
  color: var(--accent);

  text-transform: uppercase;

  letter-spacing: .08em;

  font-size: .78rem;
}

.clubs-hero h1 {
  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 5vw, 4rem);
}

.clubs-hero p {
  color: var(--text-muted);

  max-width: 650px;
}

.create-btn {
  border: none;

  border-radius: 999px;

  padding: .75rem 1.2rem;

  background: var(--accent);
  color: white;

  display: flex;
  gap: .5rem;
  align-items: center;
}

.search-section {
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;

  max-width: 450px;

  padding: .9rem 1rem;

  border-radius: 14px;

  border: 1px solid var(--border);
  background: rgba(255,255,255,.75);

  box-shadow:
    0 8px 18px rgba(0,0,0,.04);
}

.club-section {
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.club-section h2 {
  font-family: Georgia, serif;
  margin-bottom: 1.25rem;
}

.club-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fill,minmax(320px,1fr));

  gap: 1.5rem;
}

.club-card {
  background: rgba(247,241,230,.76);

  border: 1px solid rgba(255,255,255,.45);

  border-radius: 24px;

  padding: 1.4rem;

  box-shadow:
    0 12px 30px rgba(0,0,0,.08),
    inset 0 1px 0 rgba(255,255,255,.7);
}

.official-badge {
  display: inline-block;

  background: rgba(138,161,177,.15);

  color: var(--accent);

  padding: .35rem .75rem;

  border-radius: 999px;

  font-size: .8rem;
}

.club-card h3 {
  margin-top: 1rem;

  font-family: Georgia, serif;
}

.club-card p {
  color: var(--text-muted);
}

.club-info {
  display: flex;
  flex-direction: column;

  gap: .4rem;

  margin: 1rem 0;
}

.info-item {
  display: flex;

  justify-content: space-between;

  padding: .55rem 0;

  border-bottom: 1px solid rgba(0,0,0,.06);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item strong {
  color: var(--heading);
  font-size: .9rem;
}

.info-item span {
  color: var(--text-muted);
}

.details-btn {
  border: none;

  border-radius: 999px;

  padding: .65rem 1rem;

  background: var(--accent);
  color: white;
}
</style>