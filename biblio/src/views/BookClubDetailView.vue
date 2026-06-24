<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookClubStore } from '../stores/bookclubs'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()
const bookClubStore = useBookClubStore()

const editingMeeting = ref(false)

const meetingDate = ref('')
const meetingTopic = ref('')

const club = computed(() =>
  bookClubStore.clubs.find(
    c => c.id === Number(route.params.id)
  )
)

const isMember = computed(() => {

  if (!authStore.user || !club.value)
    return false

  return club.value.members.some(
    member => member.id === authStore.user.id
  )
})

const isOwner = computed(() => {

  if (!club.value || !authStore.user)
    return false

  return club.value.ownerId === authStore.user.id
})

function joinClub() {

  if (!authStore.user)
    return

  bookClubStore.joinClub(
    club.value.id,
    authStore.user
  )
}

function leaveClub() {

  if (!authStore.user)
    return

  bookClubStore.leaveClub(
    club.value.id,
    authStore.user.id
  )
}

function openProfile(memberId) {

  if (memberId === 0) {
    router.push('/profile')
    return
  }

  router.push(`/friends/${memberId}`)
}

function startMeetingEdit() {

  meetingDate.value =
    club.value.nextMeeting.date

  meetingTopic.value =
    club.value.nextMeeting.topic

  editingMeeting.value = true
}

function saveMeeting() {

  bookClubStore.updateMeeting(
    club.value.id,
    {
      date: meetingDate.value,
      topic: meetingTopic.value
    }
  )

  editingMeeting.value = false
}
</script>

<template>
  <main
    v-if="club"
    class="club-page"
  >

    <section class="club-card">

      <div class="club-header">

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

          <div class="club-meta">

            <span>
              👥 {{ club.members.length }} Mitglieder
            </span>

            <span>
              👤 {{ club.createdBy }}
            </span>

            <span>
              📅 {{ club.createdAt }}
            </span>

          </div>

        </div>

        <button
          v-if="!isMember"
          class="join-btn"
          @click="joinClub"
        >
          Beitreten
        </button>

        <button
          v-else
          class="leave-btn"
          @click="leaveClub"
        >
          Verlassen
        </button>

      </div>

      <div class="content-grid">

        <div class="content-card">

          <h2>📚 Aktuelles Buch</h2>

          <p class="big-text">
            {{ club.currentBook.title }}
          </p>

        </div>

        <div class="content-card">

          <h2>📅 Nächstes Treffen</h2>

          <p>
            <strong>Datum:</strong>
            {{ club.nextMeeting.date }}
          </p>

          <p>
            <strong>Thema:</strong>
            {{ club.nextMeeting.topic }}
          </p>

        </div>

        <div class="content-card">

          <h2>💬 Diskussionspunkte</h2>

          <ul>
            <li
              v-for="point in club.discussionPoints"
              :key="point"
            >
              {{ point }}
            </li>
          </ul>

        </div>

        <div class="content-card">

          <h2>📖 Geplante Bücher</h2>

          <ul>
            <li
              v-for="book in club.upcomingBooks"
              :key="book"
            >
              {{ book }}
            </li>
          </ul>

        </div>

      </div>

      <div class="members-section">

        <h2>Mitglieder</h2>

        <div class="members-list">

          <div
            v-for="member in club.members"
            :key="member.id"
            class="member-chip"
            @click="openProfile(member.id)"
          >
            <i class="bi bi-person-fill"></i>
            {{ member.name }}
          </div>

        </div>

      </div>

      <div
        v-if="isOwner"
        class="owner-panel"
      >

        <h2>Clubverwaltung</h2>

        <button
          class="manage-btn"
          @click="startMeetingEdit"
        >
          Treffen bearbeiten
        </button>

        <div
          v-if="editingMeeting"
          class="meeting-editor"
        >

          <input
            v-model="meetingDate"
            placeholder="Datum"
          >

          <input
            v-model="meetingTopic"
            placeholder="Thema"
          >

          <button
            class="save-btn"
            @click="saveMeeting"
          >
            Speichern
          </button>

        </div>

      </div>

    </section>

  </main>
</template>

<style scoped>
.club-page {
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

.club-card {
  max-width: 1200px;
  margin: auto;

  background: rgba(247,241,230,.76);

  border-radius: 28px;

  padding: 2rem;

  border: 1px solid rgba(255,255,255,.45);

  box-shadow:
    0 12px 30px rgba(0,0,0,.08),
    inset 0 1px 0 rgba(255,255,255,.7);
}

.club-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 2rem;

  margin-bottom: 2rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-row h1 {
  font-family: Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin: 0;
}

.official-badge {
  background: rgba(138,161,177,.15);
  color: var(--accent);

  padding: .4rem .8rem;

  border-radius: 999px;
}

.club-description {
  margin: 1rem 0;
  color: var(--text-muted);
}

.club-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  color: var(--text-muted);
}

.content-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 1rem;

  margin-bottom: 2rem;
}

.content-card {
  background: rgba(255,255,255,.55);

  padding: 1.5rem;

  border-radius: 20px;
}

.content-card h2 {
  margin-bottom: 1rem;
  font-family: Georgia, serif;
}

.big-text {
  font-size: 1.5rem;
  font-weight: 600;
}

.members-section {
  margin-top: 1rem;
}

.members-section h2 {
  font-family: Georgia, serif;
  margin-bottom: 1rem;
}

.members-list {
  display: flex;
  flex-wrap: wrap;
  gap: .75rem;
}

.member-chip {
  background: rgba(255,255,255,.65);

  border-radius: 999px;

  padding: .6rem 1rem;

  cursor: pointer;

  display: flex;
  align-items: center;
  gap: .5rem;

  transition: .2s;
}

.member-chip:hover {
  transform: translateY(-2px);
}

.join-btn,
.leave-btn,
.manage-btn,
.save-btn {
  border: none;

  border-radius: 999px;

  padding: .75rem 1.2rem;

  cursor: pointer;
}

.join-btn {
  background: #6a9e7f;
  color: white;
}

.leave-btn {
  background: #c97c7c;
  color: white;
}

.manage-btn,
.save-btn {
  background: var(--accent);
  color: white;
}

.owner-panel {
  margin-top: 2rem;

  padding-top: 2rem;

  border-top: 1px solid rgba(0,0,0,.08);
}

.meeting-editor {
  margin-top: 1rem;

  display: flex;
  gap: .75rem;
  flex-wrap: wrap;
}

.meeting-editor input {
  padding: .75rem;

  border-radius: 12px;

  border: 1px solid var(--border);
}

@media (max-width: 768px) {

  .club-header {
    flex-direction: column;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

}
</style>