<script setup>
import { ref, onMounted } from 'vue'

import PopularBooks from '../components/PopularBooks.vue'

const API_URL = 'http://localhost:8080/api/books'

const books = ref([])
const favorites = ref([])

const isLoading = ref(true)
const error = ref(null)

async function fetchBooks(filters = {}) {

  isLoading.value = true

  try {

    const params = new URLSearchParams()

    if (filters.name)
      params.append('name', filters.name)

    if (filters.category)
      params.append('category', filters.category)

    const url =
      `${API_URL}${params.toString() ? '?' + params : ''}`

    const response = await fetch(url)

    if (!response.ok)
      throw new Error()

    books.value = await response.json()

  } catch {

    error.value =
      'Bücher konnten nicht geladen werden.'

    books.value = []

  } finally {

    isLoading.value = false

  }

}

function onFilter(filters) {
  fetchBooks(filters)
}

function toggleBookmark(book) {

  const index =
    favorites.value.findIndex(
      b => b.id === book.id
    )

  if (index === -1)
    favorites.value.push(book)

  else
    favorites.value.splice(index, 1)

}

function isFavorite(book) {

  return favorites.value.some(
    b => b.id === book.id
  )

}

onMounted(() => {
  fetchBooks()
})
</script>

<template>

  <main class="books-page">

    <section class="books-hero">

      <p class="eyebrow">
        Bibliothek
      </p>

      <h1>
        Alle Bücher
      </h1>

      <p>
        Entdecke alle Bücher der Biblio Community.
      </p>

    </section>

    <div
      v-if="error"
      class="error-card"
    >
      {{ error }}
    </div>

    <PopularBooks
    :books="books"
    :isFavorite="isFavorite"
    :show-title="false"
    :boxed="false"
    @toggle-bookmark="toggleBookmark"
    @filter="onFilter"
    />

  </main>

</template>

<style scoped>
.books-page {
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

.books-hero {
  max-width: 1200px;

  margin: 0 auto 2rem;
}

.eyebrow {
  color: var(--accent);

  text-transform: uppercase;

  letter-spacing: .08em;

  font-size: .8rem;
}

.books-hero h1 {
  font-family: Georgia, serif;

  font-size: clamp(2.5rem, 5vw, 4rem);

  margin-bottom: .5rem;
}

.books-hero p {
  color: var(--text-muted);
}

.error-card {
  max-width: 1200px;

  margin: 0 auto 2rem;

  background: rgba(247,241,230,.76);

  border-radius: 20px;

  padding: 1rem;

  border: 1px solid var(--border);
}
</style>