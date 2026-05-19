<template>
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

            <button class="bookmark-btn" @click="toggleBookmark(book)">
              <i class="bi" :class="isFavorite(book) ? 'bi-bookmark-fill' : 'bi-bookmark'"></i>
            </button>
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

<script setup>
import { ref } from 'vue'
import { books } from '../data.js'

const favorites = ref([])

const toggleBookmark = (book) => {
  const index = favorites.value.findIndex(b => b.id === book.id)
  if (index === -1) favorites.value.push(book)
  else favorites.value.splice(index, 1)
}

const isFavorite = (book) => {
  return favorites.value.some(b => b.id === book.id)
}

const showDetails = (book) => {
  alert(`${book.title}\n\n${book.description}`)
}
</script>