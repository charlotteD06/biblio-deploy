<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookClubStore } from '../stores/bookclubs'
import { useAuthStore } from '../stores/auth'

const router = useRouter()

const bookClubStore = useBookClubStore()
const authStore = useAuthStore()

const name = ref('')
const description = ref('')
const currentBook = ref('')
const official = ref(false)

function createClub() {

  if (!name.value || !description.value)
    return

  bookClubStore.addClub({

    name: name.value,

    description: description.value,

    official:
      authStore.isAdmin && official.value,

    createdBy:
      authStore.user?.name || 'Gast',

    createdAt:
      new Date().toLocaleDateString(),

    currentBook: {
      id: 0,
      title: currentBook.value || 'Noch kein Buch'
    },

    nextMeeting: {
      date: 'Noch offen',
      topic: 'Noch offen'
    },

    discussionPoints: [],

    upcomingBooks: [],

    members: [
      {
        id: 0,
        name: authStore.user?.name || 'Gast'
      }
    ]

  })

  router.push('/bookclubs')
}
</script>

<template>
  <main class="create-club-page">

    <section class="create-card">

      <h1>Buchclub erstellen</h1>

      <p>
        Erstelle einen eigenen Buchclub und lade andere Leser ein.
      </p>

      <label>Name</label>

      <input
        v-model="name"
        placeholder="Name des Buchclubs"
      >

      <label>Beschreibung</label>

      <textarea
        v-model="description"
        placeholder="Worum geht es in diesem Buchclub?"
      />

      <label>Aktuelles Buch</label>

      <input
        v-model="currentBook"
        placeholder="z.B. A Little Life"
      >

      <div
        v-if="authStore.isAdmin"
        class="official-toggle"
      >
        <input
          id="official"
          v-model="official"
          type="checkbox"
        >

        <label for="official">
          Offizieller Biblio Buchclub
        </label>
      </div>

      <button
        class="create-btn"
        @click="createClub"
      >
        Buchclub erstellen
      </button>

    </section>

  </main>
</template>

<style scoped>
.create-club-page {
  min-height: calc(100vh - 80px);

  background:
    radial-gradient(circle at top right,
      rgba(138,161,177,.16),
      transparent 34%),
    var(--beige);

  padding: 3rem;
}

.create-card {
  max-width: 700px;

  margin: auto;

  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 2rem;

  border: 1px solid rgba(255,255,255,.45);
}

.create-card h1 {
  font-family: Georgia, serif;
}

label {
  display: block;

  margin-top: 1rem;
  margin-bottom: .4rem;
}

input,
textarea {
  width: 100%;

  border-radius: 12px;

  border: 1px solid var(--border);

  padding: .8rem;
}

textarea {
  min-height: 140px;
}

.official-toggle {
  display: flex;
  align-items: center;

  gap: .5rem;

  margin-top: 1rem;
}

.create-btn {
  margin-top: 1.5rem;

  border: none;

  border-radius: 999px;

  padding: .8rem 1.2rem;

  background: var(--accent);
  color: white;
}
</style>
