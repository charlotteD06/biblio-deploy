<script setup>
import { ref } from 'vue'
import { books } from '../data.js'


import PopularBooks from '../components/PopularBooks.vue'
import Features from '../components/Features.vue'
import CommunitySection from '../components/CommunitySection.vue'
import BookmarkButton from '../components/BookmarkButton.vue'

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

<PopularBooks
  :books="books"
  :isFavorite="isFavorite"
  @toggle-bookmark="toggleBookmark"
/>

<CommunitySection />

</template>