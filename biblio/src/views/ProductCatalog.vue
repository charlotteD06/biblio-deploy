<script setup>
import { ref, onMounted } from 'vue'
import { books as localBooks } from '../data.js'

import PopularBooks from '../components/PopularBooks.vue'
import Features from '../components/Features.vue'
import CommunitySection from '../components/CommunitySection.vue'
import HeroSection from '../components/HeroSection.vue'
import BookFilter from '../components/BookFilter.vue'

import { ref, onMounted, watch } from 'vue'
const API_URL = 'http://localhost:8080/api/books'

const books = ref([...localBooks])
const isLoading = ref(true)
const error = ref(null)

const favorites = ref([])
const selectedBook = ref(null)
const route = useRoute()

watch(
  () => route.query.category,
  (newCategory) => {

    fetchBooks({
      category: newCategory || ''
    })

  }, 
  { immediate: true }
)

async function fetchBooks(filters = {}) {
  isLoading.value = true
  try {
    const params = new URLSearchParams()
    if (filters.name)     params.append('name', filters.name)
    if (filters.category) params.append('category', filters.category)

    const url = `${API_URL}${params.toString() ? '?' + params : ''}`
    const response = await fetch(url)
    if (!response.ok) throw new Error()

    books.value = await response.json()

  } catch {
    error.value = 'Bücher konnten nicht geladen werden.'
    books.value = [...localBooks]
  } finally {
    isLoading.value = false
  }
}

function onFilter(filters) {
  fetchBooks(filters)
}

const toggleBookmark = (book) => {
  const index = favorites.value.findIndex(b => b.id === book.id)
  if (index === -1) favorites.value.push(book)
  else favorites.value.splice(index, 1)
}

const isFavorite = (book) => favorites.value.some(b => b.id === book.id)

const showDetails = (book) => {
  selectedBook.value = book
}
</script>

<template>

  <HeroSection />

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

  <!-- Ladeindikator -->
  <div v-if="isLoading" class="text-center pt-3 pb-1">
    <div class="spinner-border spinner-border-sm me-2"
         style="color: var(--accent);" role="status"></div>
    <span style="color: var(--text-muted); font-size: 0.85rem;">
      Bücher werden geladen...
    </span>
  </div>

  <!-- Fehlermeldung -->
  <div v-if="error" class="container py-2">
    <div class="alert mb-0"
         style="background: var(--beige-dark); border: 1px solid var(--border); border-radius: 12px; font-size: 0.85rem;">
      <i class="bi bi-exclamation-circle me-2" style="color: var(--accent);"></i>
      {{ error }} Lokale Daten werden verwendet.
    </div>
  </div>


  <!-- Abstand zwischen Features und Filter -->
  <div class="container-fluid px-4 px-md-5 mt-4">
    <BookFilter @filter="onFilter" />
  </div>

 

  <!-- Bücher -->

  <PopularBooks
    :books="books"
    :isFavorite="isFavorite"
    @toggle-bookmark="toggleBookmark"
  />

  <CommunitySection />

</template>