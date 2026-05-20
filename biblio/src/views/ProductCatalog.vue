<script setup>
import { ref, onMounted } from 'vue'
import { books as localBooks } from '../data.js'

import PopularBooks from '../components/PopularBooks.vue'
import Features from '../components/Features.vue'
import CommunitySection from '../components/CommunitySection.vue'

// ── STATE ──────────────────────────────────────────
// Startet sofort mit lokalen Daten – keine leere Seite
const books = ref([...localBooks])
const isLoading = ref(true)
const error = ref(null)

const favorites = ref([])
const selectedBook = ref(null)

onMounted(async () => {
  try {
    const results = await Promise.all(
      localBooks.map(book => fetchCover(book.isbn))
    )

    books.value = localBooks.map((book, index) => ({
      ...book,
      // nur ersetzen wenn die API wirklich ein Bild zurückgegeben hat
      image: results[index] ?? book.image,
    }))

  } catch (e) {
    error.value = 'Cover konnten nicht geladen werden.'
  } finally {
    isLoading.value = false
  }
})

async function fetchCover(isbn) {
  try {
    // Timeout nach 5 Sekunden – Open Library ist manchmal langsam
    const controller = new AbortController()
    //const timeout = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
      { signal: controller.signal }
    )
    clearTimeout(timeout)

    if (!response.ok) return null

    const data = await response.json()
    const bookData = data[`ISBN:${isbn}`]

    return bookData?.cover?.large ?? bookData?.cover?.medium ?? null

  } catch {
    // Timeout oder Netzwerkfehler → lokales Fallback-Bild wird behalten
    return null
  }
}
// ── BOOKMARK ───────────────────────────────────────
const toggleBookmark = (book) => {
  const index = favorites.value.findIndex(b => b.id === book.id)
  if (index === -1) favorites.value.push(book)
  else favorites.value.splice(index, 1)
}

const isFavorite = (book) => favorites.value.some(b => b.id === book.id)

// ── MODAL ──────────────────────────────────────────
const showDetails = (book) => {
  selectedBook.value = book
}
</script>

<template>

  <!-- MODAL -->
  <div v-if="selectedBook" class="modal-backdrop fade show"></div>
  <div v-if="selectedBook" class="modal fade show" style="display:block;">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5>{{ selectedBook.title }}</h5>
          <button class="btn-close" @click="selectedBook = null"></button>
        </div>
        <div class="modal-body">
          <p><strong>Autor:</strong> {{ selectedBook.author }}</p>
          <p>{{ selectedBook.description }}</p>
          <p><strong>Rating:</strong> {{ selectedBook.rating }}</p>
        </div>
      </div>
    </div>
  </div>

  <Features />

  <!-- Ladeindikator – nur solange Cover noch laden -->
  <div v-if="isLoading" class="text-center pt-3 pb-1">
    <div class="spinner-border spinner-border-sm me-2"
         style="color: var(--accent);" role="status"></div>
    <span style="color: var(--text-muted); font-size: 0.85rem;">
      Cover werden geladen...
    </span>
  </div>

  <!-- Fehlermeldung – nur wenn API komplett fehlschlägt -->
  <div v-if="error" class="container py-2">
    <div class="alert mb-0"
         style="background: var(--beige-dark); border: 1px solid var(--border); border-radius: 12px; font-size: 0.85rem;">
      <i class="bi bi-exclamation-circle me-2" style="color: var(--accent);"></i>
      {{ error }} Lokale Bilder werden verwendet.
    </div>
  </div>

  <!-- Bücher – sofort sichtbar, Cover tauschen sich still aus -->
  <PopularBooks
    :books="books"
    :isFavorite="isFavorite"
    @toggle-bookmark="toggleBookmark"
  />

  <CommunitySection />

</template>