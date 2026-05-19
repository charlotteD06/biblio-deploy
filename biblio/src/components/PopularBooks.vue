<script setup>
import { ref } from 'vue'
import { books } from '../data.js'
import BookmarkButton from './BookmarkButton.vue'

const favorites = ref([])

const toggleBookmark = (book) => {
  const index = favorites.value.findIndex(b => b.id === book.id)
  if (index === -1) favorites.value.push(book)
  else favorites.value.splice(index, 1)
}

const isFavorite = (book) => {
  return favorites.value.some(b => b.id === book.id)
}

const selectedBook = ref(null)

const showDetails = (book) => {
  selectedBook.value = book
}
</script>


<template>
<!-- Pop-up -->
<div
  class="modal fade"
  tabindex="-1"
  :class="{ show: selectedBook }"
  style="display: block;"
  v-if="selectedBook"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">{{ selectedBook.title }}</h5>
        <button type="button" class="btn-close" @click="selectedBook = null"></button>
      </div>

      <div class="modal-body">
        <p><strong>Autor:</strong> {{ selectedBook.author }}</p>
        <p>{{ selectedBook.description }}</p>
        <p><strong>Rating:</strong> {{ selectedBook.rating }}</p>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="selectedBook = null">
          Schließen
        </button>
      </div>

    </div>
  </div>
</div>

<div v-if="selectedBook" class="modal-backdrop fade show"></div>



  <section class="popular-section">

    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2>Beliebte Bücher</h2>
      <div class="d-flex align-items-center gap-2">
        <a href="#" class="text-muted small text-decoration-none">Alle ansehen</a>
        <button class="btn btn-sm btn-outline-secondary rounded-circle">&lsaquo;</button>
        <button class="btn btn-sm btn-outline-secondary rounded-circle">&rsaquo;</button>
      </div>
    </div>

    <div class="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-3">

      <div class="col" v-for="book in books" :key="book.id">
        <div class="book-card">

          <div class="book-cover-img">
            <img :src="book.image" :alt="book.title" />

            <BookmarkButton
                :isActive="isFavorite(book)"
                @toggle="toggleBookmark(book)"
            />
          </div>

          <h4 class="mt-2">{{ book.title }}</h4>
          <div class="author">{{ book.author }}</div>

          <div class="stars">
            <i v-for="n in 5" :key="n" class="bi"
               :class="n <= Math.round(book.rating) ? 'bi-star-fill' : 'bi-star'"></i>

            <span class="text-muted">{{ book.rating }}</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary mt-2"
                  @click="showDetails(book)">
            Details
          </button>

        </div>
      </div>

    </div>

  </section>
</template>


