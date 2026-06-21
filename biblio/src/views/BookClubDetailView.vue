<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBookClubStore } from '../stores/bookclubs'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const route = useRoute()
const bookClubStore = useBookClubStore()

const club = computed(() =>
  bookClubStore.clubs.find(
    c => c.id === Number(route.params.id)
  )
)

const isMember = computed(() => {

  if (!authStore.user || !club.value)
    return false

  return club.value.members.some(
    member => member.name === authStore.user.name
  )

})

function openProfile(memberId) {

  if(memberId === 0) {
    router.push('/profile')
    return
  }

  router.push(`/friends/${memberId}`)
}

</script>

<template>
  <main
    v-if="club"
    class="club-detail-page"
  >

    <section class="club-header">

      <div>

        <div class="title-row">

          <h1>{{ club.name }}</h1>

          <span
            v-if="club.official"
            class="official-badge"
          >
            ✓ Offiziell
          </span>

        </div>

        <p class="club-description">
          {{ club.description }}
        </p>

        <div class="club-actions">

        <button
            v-if="!isMember"
            class="join-btn"
            @click="bookClubStore.joinClub(
            club.id, userName)"
        >
            Beitreten
        </button>

        <button
            v-else
            class="leave-btn"
            @click="bookClubStore.leaveClub(
            club.id,
            authStore.user.name
            )"
        >
            Verlassen
        </button>

        </div>

      </div>

    </section>

    <section class="info-grid">

      <article class="info-card">

        <h2>Informationen</h2>

        <p>
          <strong>Erstellt:</strong>
          {{ club.createdAt }}
        </p>

        <p>
          <strong>Erstellt von:</strong>
          {{ club.createdBy }}
        </p>

        <p>
          <strong>Mitglieder:</strong>
          {{ club.members.length }}
        </p>

      </article>

      <article class="info-card">

        <h2>Aktuelles Buch</h2>

        <p>
          {{ club.currentBook.title }}
        </p>

      </article>

    </section>

    <section class="meeting-card">

      <h2>Nächstes Treffen</h2>

      <p>
        <strong>Datum:</strong>
        {{ club.nextMeeting.date }}
      </p>

      <p>
        <strong>Thema:</strong>
        {{ club.nextMeeting.topic }}
      </p>

      <h3>Diskussionspunkte</h3>

      <ul>
        <li
          v-for="point in club.discussionPoints"
          :key="point"
        >
          {{ point }}
        </li>
      </ul>

    </section>

    <section class="future-books-card">

      <h2>Geplante Bücher</h2>

      <ul>
        <li
          v-for="book in club.upcomingBooks"
          :key="book"
        >
          {{ book }}
        </li>
      </ul>

    </section>

    <section class="members-card">

      <h2>Mitglieder</h2>

      <div class="members-list">

        <div
            v-for="member in club.members"
            :key="member.id"
            class="member clickable-member"
            @click="openProfile(member.id)"
            >
            <i class="bi bi-person-fill"></i>

            {{ member.name }}

            <i class="bi bi-arrow-right-short"></i>
        </div>

      </div>

    </section>

  </main>
</template>

<style scoped>
.club-detail-page {
  min-height: calc(100vh - 80px);

  background:
    radial-gradient(circle at top right,
      rgba(138,161,177,.16),
      transparent 34%),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.club-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-row h1 {
  font-family: Georgia, serif;
}

.official-badge {
  padding: .35rem .8rem;

  border-radius: 999px;

  background: rgba(138,161,177,.15);

  color: var(--accent);
}

.club-description {
  color: var(--text-muted);
}

.info-grid {
  max-width: 1200px;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(2,1fr);

  gap: 1rem;
}

.info-card,
.meeting-card,
.future-books-card,
.members-card {
  max-width: 1200px;

  margin: 1rem auto;

  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 1.4rem;

  border: 1px solid rgba(255,255,255,.45);
}

.members-list {
  display: flex;
  flex-wrap: wrap;
  gap: .75rem;
}

.member {
  background: rgba(255,255,255,.5);

  padding: .5rem .9rem;

  border-radius: 999px;
}

.clickable-member {
  cursor: pointer;

  transition: .2s;

  display: flex;
  align-items: center;
  gap: .4rem;
}

.clickable-member:hover {
  transform: translateY(-2px);

  background: rgba(138,161,177,.15);
}
</style>