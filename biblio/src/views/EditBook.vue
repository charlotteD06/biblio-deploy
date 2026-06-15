<template>
  <div class="container py-4">

    <router-link to="/" class="back-link mb-4 d-inline-flex align-items-center gap-2">
      <i class="bi bi-arrow-left"></i> Zurück
    </router-link>

    <h2 class="page-title mb-4">Buch bearbeiten</h2>

    <div v-if="message" class="alert alert-success save-alert">
      <i class="bi bi-check-circle me-2"></i>
      {{ message }}
    </div>

    <div v-if="error" class="alert alert-danger save-alert">
      <i class="bi bi-exclamation-circle me-2"></i>
      {{ error }}
    </div>

    <div v-if="form" class="form-card">
      
      <div class="cover-preview-wrapper">
        <img
          v-if="form.image"
          :src="form.image"
          alt="Cover Vorschau"
          class="cover-preview"
        />

        <div v-else class="cover-placeholder">
          <i class="bi bi-book"></i>
          <span>Cover Vorschau</span>
        </div>

      </div>

      <div class="row g-3">

        <div class="col-md-6">
          <label class="form-label">Titel</label>
          <input v-model="form.title" type="text" class="form-input" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Autor</label>
          <input v-model="form.author" type="text" class="form-input" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Kategorie</label>
          <select v-model="form.category" class="form-input">
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label">Aktuelle Bewertung</label>
          <input
            :value="form.rating + ' ★'"
            class="form-input"
            disabled
          />
        </div>

        <div class="col-12">
          <label class="form-label">Bild-URL</label>
          <input v-model="form.image" type="text" class="form-input" />
        </div>

        <div class="col-12">
          <label class="form-label">Beschreibung</label>
          <textarea v-model="form.description" class="form-input" rows="4"></textarea>
        </div>

        <div class="col-md-6">
          <label class="form-label">Seitenanzahl</label>
          <input
            v-model.number="form.totalPages"
            type="number"
            min="1"
            class="form-input"
          />
        </div>


        <div class="col-12 d-flex gap-2 mt-2 flex-wrap">
          <button class="lib-btn current" @click="updateBook">
            <i class="bi bi-check-lg me-2"></i>Speichern
          </button>

          <button class="lib-btn danger" @click="deleteBook">
            <i class="bi bi-trash me-2"></i>Löschen
          </button>

          <router-link to="/" class="lib-btn wishlist">
            Abbrechen
          </router-link>
        </div>

      </div>
    </div>

    <div v-else class="text-muted">Buch wird geladen...</div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const API_URL = 'http://localhost:8080/api/books'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = ref(null)
const message = ref('')
const error = ref('')

if (!authStore.isAdmin) {
  router.push('/')
}

const categories = [
  'Literary Fiction',
  'Science Fiction',
  'Fantasy',
  'Classic',
  'Mystery',
  'Romance',
  'Non-Fiction',
]

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/${route.params.id}`)
    if (!response.ok) throw new Error()

    const book = await response.json()

    form.value = {
      title: book.title,
      author: book.author,
      category: book.category,
      rating: book.rating ?? 0,
      image: book.image,
      description: book.description,
      totalPages: book.totalPages ?? 0
    }
  } catch {
    error.value = 'Buch konnte nicht geladen werden.'
    setTimeout(() => router.push('/'), 1500)
  }
})

async function updateBook() {
  error.value = ''
  message.value = ''

  try {
    const response = await fetch(`${API_URL}/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!response.ok) throw new Error()

    message.value = 'Buch erfolgreich gespeichert.'

    setTimeout(() => {
      router.push('/')
    }, 1000)

  } catch {
    error.value = 'Fehler beim Speichern.'
  }
}

async function deleteBook() {
  if (!confirm(`„${form.value.title}" wirklich löschen?`)) return

  error.value = ''
  message.value = ''

  try {
    const response = await fetch(`${API_URL}/${route.params.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) throw new Error()

    message.value = 'Buch wurde gelöscht.'

    setTimeout(() => {
      router.push('/')
    }, 1000)

  } catch {
    error.value = 'Fehler beim Löschen.'
  }
}
</script>

<style scoped>
.back-link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.88rem;
}

.back-link:hover {
  color: var(--accent);
}

.page-title {
  font-family: Georgia, serif;
  color: var(--heading);
}

.form-card {
  background: var(--beige-dark);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  max-width: 700px;
}

.cover-preview-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.cover-preview {
  width: 180px;
  height: 260px;

  object-fit: cover;

  border-radius: 14px;

  border: 1px solid var(--border);

  box-shadow:
    0 12px 24px rgba(0,0,0,0.12),
    0 4px 8px rgba(0,0,0,0.06);
}

.cover-placeholder {
  width: 180px;
  height: 260px;

  border: 2px dashed var(--border);
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: var(--text-muted);

  background: var(--beige);
}

.cover-placeholder i {
  font-size: 3rem;
  margin-bottom: 0.8rem;
}

.save-alert {
  max-width: 700px;
  border-radius: 14px;
}

.form-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
  display: block;
}

.form-input {
  width: 100%;
  padding: 0.55rem 1rem;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  background: var(--beige);
  color: var(--text);
  font-family: inherit;
  font-size: 0.88rem;
  outline: none;
}

.form-input:focus {
  border-color: var(--accent);
}

textarea.form-input {
  resize: vertical;
}

.lib-btn {
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
}

.lib-btn:hover {
  opacity: 0.85;
}

.lib-btn.current {
  background: var(--accent);
  color: #fff;
}

.lib-btn.danger {
  background: #c0392b;
  color: #fff;
}

.lib-btn.wishlist {
  background: var(--beige-mid);
  color: var(--heading);
  border: 1.5px solid var(--border);
}
</style>