<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookClubStore } from '../stores/bookclubs'
import { useFriendsStore } from '../stores/friends'

const router = useRouter()

const bookClubStore = useBookClubStore()
const friendsStore = useFriendsStore()

const totalBookClubs = computed(
  () => bookClubStore.clubs.length
)

const totalUsers = computed(
  () => friendsStore.allUsers.length + 1
)

function goToBookClubs() {
  router.push('/admin/bookclubs')
}
</script>

<template>
  <main class="admin-page">

    <section class="admin-hero">

      <p class="eyebrow">
        Administration
      </p>

      <h1>Biblio Dashboard</h1>

      <p>
        Verwalte die Community und die Buchclubs der Plattform.
      </p>

    </section>

    <section class="stats-grid">

      <div class="stat-card">
        <span>📖</span>
        <strong>{{ totalBookClubs }}</strong>
        <p>Buchclubs</p>
      </div>

      <div class="stat-card">
        <span>👥</span>
        <strong>{{ totalUsers }}</strong>
        <p>Nutzer</p>
      </div>

      <div class="stat-card">
        <span>📚</span>
        <strong>12</strong>
        <p>Bücher</p>
      </div>

    </section>

    <section class="admin-grid">

      <article
        class="admin-card featured"
        @click="goToBookClubs"
      >

        <div class="card-icon">
          <i class="bi bi-people-fill"></i>
        </div>

        <h2>Buchclubs verwalten</h2>

        <p>
          Offizielle und private Buchclubs bearbeiten,
          löschen und neue Clubs anlegen.
        </p>

        <span class="card-link">
          Zur Verwaltung →
        </span>

      </article>

    </section>

    <section class="activity-card">

      <h2>Plattformübersicht</h2>

      <ul>

        <li>
          {{ totalBookClubs }} aktive Buchclubs
        </li>

        <li>
          {{ totalUsers }} registrierte Nutzer
        </li>

        <li>
          Community-Funktionen aktiv
        </li>

        <li>
          Buchclubs können erstellt und verwaltet werden
        </li>

      </ul>

    </section>

  </main>
</template>

<style scoped>
.admin-page {
  min-height: calc(100vh - 80px);

  background:
    radial-gradient(
      circle at top right,
      rgba(138,161,177,.16),
      transparent 34%
    ),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.admin-hero {
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: .08em;
  font-size: .8rem;
}

.admin-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  margin-bottom: .75rem;
}

.admin-hero p {
  color: var(--text-muted);
  max-width: 650px;
}

.stats-grid {
  max-width: 1200px;
  margin: 0 auto 2rem;

  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(220px,1fr));

  gap: 1rem;
}

.stat-card {
  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 1.5rem;

  text-align: center;

  border: 1px solid rgba(255,255,255,.45);

  box-shadow:
    0 12px 30px rgba(0,0,0,.08);
}

.stat-card span {
  font-size: 2rem;
}

.stat-card strong {
  display: block;

  margin: .5rem 0;

  font-size: 2rem;

  font-family: Georgia, serif;
}

.stat-card p {
  margin: 0;
  color: var(--text-muted);
}

.admin-grid {
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.admin-card {
  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 2rem;

  border: 1px solid rgba(255,255,255,.45);

  cursor: pointer;

  transition: .2s;
}

.admin-card:hover {
  transform: translateY(-4px);
}

.card-icon {
  width: 60px;
  height: 60px;

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(138,161,177,.15);

  margin-bottom: 1rem;
}

.card-icon i {
  font-size: 1.7rem;
  color: var(--accent);
}

.admin-card h2 {
  font-family: Georgia, serif;
  margin-bottom: .75rem;
}

.admin-card p {
  color: var(--text-muted);
}

.card-link {
  display: inline-block;
  margin-top: 1rem;

  color: var(--accent);
  font-weight: 600;
}

.activity-card {
  max-width: 1200px;

  margin: auto;

  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 2rem;

  border: 1px solid rgba(255,255,255,.45);
}

.activity-card h2 {
  font-family: Georgia, serif;
  margin-bottom: 1rem;
}

.activity-card ul {
  padding-left: 1.2rem;
}

.activity-card li {
  margin-bottom: .75rem;
  color: var(--text-muted);
}
</style>