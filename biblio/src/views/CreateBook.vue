<template>
  <div class="container py-4">

    <router-link to="/" class="back-link mb-4 d-inline-flex align-items-center gap-2">
      <i class="bi bi-arrow-left"></i> Zurück
    </router-link>

    <h2 class="page-title mb-4">Neues Buch hinzufügen</h2>

    <div class="form-card">
      <div class="row g-3">

        <div class="col-md-6">
          <label class="form-label">Titel</label>
          <input v-model="form.title" type="text" class="form-input" placeholder="Buchtitel" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Autor</label>
          <input v-model="form.author" type="text" class="form-input" placeholder="Autor" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Kategorie</label>
          <select v-model="form.category" class="form-input">
            <option value="">Bitte wählen</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label">Bewertung (1–5)</label>
          <input v-model.number="form.rating" type="number" min="1" max="5" step="0.1" class="form-input" />
        </div>

        <div class="col-12">
          <label class="form-label">Bild-URL</label>
          <input v-model="form.image" type="text" class="form-input" placeholder="https://..." />
        </div>

        <div class="col-12">
          <label class="form-label">Beschreibung</label>
          <textarea v-model="form.description" class="form-input" rows="4" placeholder="Kurze Beschreibung..."></textarea>
        </div>

        <div class="col-12 d-flex gap-2 mt-2">
          <button class="lib-btn current" @click="createBook">
            <i class="bi bi-plus-lg me-2"></i>Buch hinzufügen
          </button>
          <router-link to="/" class="lib-btn wishlist">
            Abbrechen
          </router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:8080/api/books'

const router = useRouter()

// Formular-Daten
const form = ref({
  title: '',
  author: '',
  description: '',
  rating: 4.0,
  image: '',
  category: '',
})

// Kategorien für das Dropdown
const categories = [
  'Literary Fiction',
  'Science Fiction',
  'Fantasy',
  'Classic',
  'Mystery',
  'Romance',
  'Non-Fiction',
]

// POST /api/books – neues Buch erstellen
async function createBook() {
  // einfache Validierung
  if (!form.value.title || !form.value.author) {
    alert('Bitte Titel und Autor angeben.')
    return
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!response.ok) throw new Error()

    alert('Buch erfolgreich hinzugefügt!')
    router.push('/')  // zurück zur Übersicht

  } catch {
    alert('Fehler beim Hinzufügen. Bitte versuche es erneut.')
  }
}
</script>

<style scoped>
.back-link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.88rem;
}
.back-link:hover { color: var(--accent); }

.page-title {
  font-family: 'Georgia', serif;
  color: var(--heading);
}

.form-card {
  background: var(--beige-dark);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  max-width: 700px;
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

.form-input:focus { border-color: var(--accent); }

textarea.form-input { resize: vertical; }

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
.lib-btn:hover { opacity: 0.85; }
.lib-btn.current { background: var(--accent); color: #fff; }
.lib-btn.wishlist { background: var(--beige-mid); color: var(--heading); border: 1.5px solid var(--border); }
</style>