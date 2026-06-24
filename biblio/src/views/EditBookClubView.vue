<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookClubStore } from '../stores/bookclubs'

const route = useRoute()
const router = useRouter()
const store = useBookClubStore()

const club = ref(
  JSON.parse(
    JSON.stringify(
      store.clubs.find(c => c.id === Number(route.params.id))
    )
  )
)

function save() {
  const index = store.clubs.findIndex(
    c => c.id === club.value.id
  )

  store.clubs[index] = club.value

  localStorage.setItem(
    'biblio-bookclubs',
    JSON.stringify(store.clubs)
  )

  router.push('/admin/bookclubs')
}
</script>

<template>
  <main class="admin-edit-page">

    <section class="page-header">
      <p class="eyebrow">Administration</p>
      <h1>Buchclub bearbeiten</h1>
    </section>

    <section class="edit-card">

      <label>Name</label>
      <input v-model="club.name" />

      <label>Beschreibung</label>
      <textarea v-model="club.description" />

      <label>Erstellt von</label>
      <input v-model="club.createdBy" />

      <label>Offiziell?</label>
      <select v-model="club.official">
        <option :value="true">Ja</option>
        <option :value="false">Nein</option>
      </select>

      <hr />
      <section class="edit-card-h3">
      <h3>Aktuelles Buch</h3>
      </section>

      <label>Titel</label>
      <input v-model="club.currentBook.title" />

      <label>Autor</label>
      <input v-model="club.currentBook.author" />

      <hr />

      <section class="edit-card-h3">
      <h3>Nächstes Treffen</h3></section>

      <label>Datum</label>
      <input type="date" v-model="club.nextMeeting.date" />


      <div class="actions">
        <button class="save-btn" @click="save">
          Speichern
        </button>

        <button class="cancel-btn" @click="router.back()">
          Abbrechen
        </button>
      </div>

    </section>

  </main>
</template>

<style scoped>
.admin-edit-page {
  min-height: calc(100vh - 80px);
  background:
    radial-gradient(circle at top right,
      rgba(138,161,177,.16),
      transparent 34%),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.page-header {
  max-width: 900px;
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

.edit-card {
  max-width: 900px;
  margin: auto;

  background: rgba(247,241,230,.76);
  border: 1px solid rgba(255,255,255,.45);
  border-radius: 24px;

  padding: 2rem;

  box-shadow: 0 12px 30px rgba(0,0,0,.08);

}

.edit-card-h3 {
   font-family: Georgia, serif; 
}

label {
  display: block;
  margin-top: 1rem;
  margin-bottom: .3rem;
  color: var(--text-muted);
  font-size: .85rem;
}

input, textarea {
  width: 100%;
  padding: .75rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,.8);
}

textarea {
  min-height: 120px;
}

.actions {
  display: flex;
  gap: .75rem;
  margin-top: 1.5rem;
}

.save-btn {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 999px;
  padding: .65rem 1rem;
}

.cancel-btn {
  background: #ddd;
  border: none;
  border-radius: 999px;
  padding: .65rem 1rem;
}
</style>